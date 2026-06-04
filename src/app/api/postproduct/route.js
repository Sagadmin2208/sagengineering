import { NextResponse } from "next/server";
import { Buffer } from "buffer";
import { db } from "../../../lib/db"; // Ensure this path is correct

export async function POST(req) {
  let connection;

  try {
    // 1. Get Connection (Inside try block to catch connection errors)
    connection = await db.getConnection();

    const formData = await req.formData();

    // =====================
    // BASIC PRODUCT DATA
    // =====================
    const product = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      category: formData.get("category"),
      image: null, // Initial image is null, we insert images into separate table
      short_description: formData.get("short_description"),
      long_description: formData.get("long_description"),
    };

    // Validation
    if (!product.name || !product.slug) {
      return NextResponse.json(
        { success: false, message: "Product name & slug required" },
        { status: 400 }
      );
    }

    // Safe JSON Parsing with fallbacks
    const features = JSON.parse(formData.get("features") || "[]");
    const applications = JSON.parse(formData.get("applications") || "[]");
    const specifications = JSON.parse(formData.get("specifications") || "{}");
    const variants = JSON.parse(formData.get("variants") || "[]");

    // Start Transaction
    await connection.beginTransaction();

    // =====================
    // 1. INSERT PRODUCT
    // =====================
    const [productRes] = await connection.query(
      `INSERT INTO products 
       (name, slug, category, image, short_description, long_description) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        product.name,
        product.slug,
        product.category,
        product.image,
        product.short_description,
        product.long_description,
      ]
    );

    const productId = productRes.insertId;

    // =====================
    // 2. INSERT IMAGES (Base64)
    // =====================
    const imageFiles = formData.getAll("images");

    for (const file of imageFiles) {
      // Ensure file is valid before processing
      if (file && typeof file.arrayBuffer === 'function') {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

        await connection.query(
          `INSERT INTO product_images (product_id, image) VALUES (?, ?)`,
          [productId, base64Image]
        );
      }
    }

    // =====================
    // 3. INSERT FEATURES
    // =====================
    for (const feature of features) {
      await connection.query(
        `INSERT INTO product_features (product_id, feature) VALUES (?, ?)`,
        [productId, feature]
      );
    }

    // =====================
    // 4. INSERT SPECIFICATIONS
    // =====================
    for (const [key, value] of Object.entries(specifications)) {
      await connection.query(
        `INSERT INTO product_specifications (product_id, spec_key, spec_value) VALUES (?, ?, ?)`,
        [productId, key, value]
      );
    }

    // =====================
    // 5. INSERT APPLICATIONS
    // =====================
    for (const app of applications) {
      await connection.query(
        `INSERT INTO product_applications (product_id, application) VALUES (?, ?)`,
        [productId, app]
      );
    }

    // =====================
    // 6. INSERT VARIANTS
    // =====================
    for (const variant of variants) {
      if (variant.variant_key) {
        // A. Insert Variant Key (Group)
        const [variantRes] = await connection.query(
          `INSERT INTO product_variants (product_id, variant_key) VALUES (?, ?)`,
          [productId, variant.variant_key]
        );

        const variantId = variantRes.insertId;

        // B. Insert Variant Values (Check if values exist and is array)
        const values = Array.isArray(variant.values) ? variant.values : [];
        
        for (const value of values) {
          await connection.query(
            `INSERT INTO product_variant_values (variant_id, variant_value) VALUES (?, ?)`,
            [variantId, value]
          );
        }
      }
    }

    // Commit Transaction
    await connection.commit();

    return NextResponse.json({
      success: true,
      product_id: productId,
      message: "Product created successfully",
    });

  } catch (error) {
    // Rollback only if connection exists
    if (connection) await connection.rollback();
    
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server error: " + error.message },
      { status: 500 }
    );

  } finally {
    // Release only if connection exists
    if (connection) connection.release();
  }
}