import { Buffer } from "buffer";
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function POST(req) {
  const connection = await db.getConnection();

  try {
    const formData = await req.formData();

    // =====================
    // VALIDATE PRODUCT ID
    // =====================
    const productId = Number(formData.get("product_id"));

    if (!productId || isNaN(productId)) {
      return NextResponse.json(
        { success: false, message: "Valid product_id is required" },
        { status: 400 }
      );
    }

    // ✅ CHECK PRODUCT EXISTS (CRITICAL FIX)
    const [[existingProduct]] = await connection.query(
      "SELECT id FROM products WHERE id = ?",
      [productId]
    );

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // =====================
    // PARSE DATA
    // =====================
    const product = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      category: formData.get("category"),
      short_description: formData.get("short_description"),
      long_description: formData.get("long_description"),
    };

    const features = JSON.parse(formData.get("features") || "[]");
    const applications = JSON.parse(formData.get("applications") || "[]");
    const specifications = JSON.parse(formData.get("specifications") || "{}");
    const variants = JSON.parse(formData.get("variants") || "[]");

    await connection.beginTransaction();

    // =====================
    // UPDATE PRODUCT
    // =====================
    await connection.query(
      `UPDATE products SET
        name = ?,
        slug = ?,
        category = ?,
        short_description = ?,
        long_description = ?
       WHERE id = ?`,
      [
        product.name,
        product.slug,
        product.category,
        product.short_description,
        product.long_description,
        productId,
      ]
    );

    // =====================
    // IMAGES (OPTIONAL REPLACE)
    // =====================
    const imageFiles = formData.getAll("images");
    if (imageFiles.length > 0 && imageFiles[0].size > 0) {
      await connection.query(
        "DELETE FROM product_images WHERE product_id = ?",
        [productId]
      );

      for (const file of imageFiles) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64Image = buffer.toString("base64");

        await connection.query(
          "INSERT INTO product_images (product_id, image) VALUES (?, ?)",
          [productId, base64Image]
        );
      }
    }

    // =====================
    // FEATURES
    // =====================
    await connection.query(
      "DELETE FROM product_features WHERE product_id = ?",
      [productId]
    );

    for (const feature of features) {
      await connection.query(
        "INSERT INTO product_features (product_id, feature) VALUES (?, ?)",
        [productId, feature]
      );
    }

    // =====================
    // SPECIFICATIONS
    // =====================
    await connection.query(
      "DELETE FROM product_specifications WHERE product_id = ?",
      [productId]
    );

    for (const [key, value] of Object.entries(specifications)) {
      await connection.query(
        `INSERT INTO product_specifications
         (product_id, spec_key, spec_value)
         VALUES (?, ?, ?)`,
        [productId, key, value]
      );
    }

    // =====================
    // APPLICATIONS
    // =====================
    await connection.query(
      "DELETE FROM product_applications WHERE product_id = ?",
      [productId]
    );

    for (const app of applications) {
      await connection.query(
        "INSERT INTO product_applications (product_id, application) VALUES (?, ?)",
        [productId, app]
      );
    }

    // =====================
    // VARIANTS (NORMALIZED)
    // =====================

    // 1️⃣ Get old variant IDs
    const [oldVariants] = await connection.query(
      "SELECT id FROM product_variants WHERE product_id = ?",
      [productId]
    );

    if (oldVariants.length > 0) {
      const variantIds = oldVariants.map(v => v.id);

      // 2️⃣ Delete old variant values first
      await connection.query(
        "DELETE FROM product_variant_values WHERE variant_id IN (?)",
        [variantIds]
      );
    }

    // 3️⃣ Delete old variant keys
    await connection.query(
      "DELETE FROM product_variants WHERE product_id = ?",
      [productId]
    );

    // 4️⃣ Insert new variants
    for (const variant of variants) {
      const [variantRes] = await connection.query(
        "INSERT INTO product_variants (product_id, variant_key) VALUES (?, ?)",
        [productId, variant.variant_key]
      );

      const variantId = variantRes.insertId;

      for (const value of variant.values) {
        await connection.query(
          "INSERT INTO product_variant_values (variant_id, variant_value) VALUES (?, ?)",
          [variantId, value]
        );
      }
    }

    await connection.commit();

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product_id: productId,
    });

  } catch (error) {
    await connection.rollback();
    console.error("UPDATE ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}
