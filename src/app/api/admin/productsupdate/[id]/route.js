// Add Buffer global for environments where it's not defined
import { Buffer } from "buffer";
import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function PUT(req, { params }) {
  const { id } = params;
  const connection = await db.getConnection();

  try {
    const formData = await req.formData();

    // =====================
    // BASIC PRODUCT DATA
    // =====================
    const name = formData.get("name");
    const category = formData.get("category");
    const short_description = formData.get("short_description");
    const long_description = formData.get("long_description");

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Product name is required" },
        { status: 400 }
      );
    }

    const features = JSON.parse(formData.get("features") || "[]");
    const applications = JSON.parse(formData.get("applications") || "[]");
    const specifications = JSON.parse(formData.get("specifications") || "{}");
    const variants = JSON.parse(formData.get("variants") || "[]");

    await connection.beginTransaction();

    // =====================
    // UPDATE PRODUCT
    // =====================
    const [updateRes] = await connection.query(
      `UPDATE products SET
        name = ?,
        category = ?,
        short_description = ?,
        long_description = ?
       WHERE id = ?`,
      [name, category, short_description, long_description, id]
    );

    if (updateRes.affectedRows === 0) {
      await connection.rollback();
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // =====================
    // DELETE OLD RELATED DATA
    // =====================
    await connection.query("DELETE FROM product_images WHERE product_id = ?", [id]);
    await connection.query("DELETE FROM product_features WHERE product_id = ?", [id]);
    await connection.query("DELETE FROM product_applications WHERE product_id = ?", [id]);
    await connection.query("DELETE FROM product_specifications WHERE product_id = ?", [id]);
    await connection.query("DELETE FROM product_variants WHERE product_id = ?", [id]);

    // =====================
    // IMAGES (FILES → BASE64)
    // =====================
    const imageFiles = formData.getAll("images");

    for (const file of imageFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Image = buffer.toString("base64");

      await connection.query(
        "INSERT INTO product_images (product_id, image) VALUES (?, ?)",
        [id, base64Image]
      );
    }

    // =====================
    // FEATURES
    // =====================
    for (const f of features) {
      await connection.query(
        "INSERT INTO product_features (product_id, feature) VALUES (?, ?)",
        [id, f]
      );
    }

    // =====================
    // SPECIFICATIONS
    // =====================
    for (const [key, value] of Object.entries(specifications)) {
      await connection.query(
        `INSERT INTO product_specifications
         (product_id, spec_key, spec_value)
         VALUES (?, ?, ?)`,
        [id, key, value]
      );
    }

    // =====================
    // APPLICATIONS
    // =====================
    for (const app of applications) {
      await connection.query(
        "INSERT INTO product_applications (product_id, application) VALUES (?, ?)",
        [id, app]
      );
    }

    // =====================
    // VARIANTS
    // =====================
    for (const variant of variants) {
      for (const [key, value] of Object.entries(variant.values)) {
        await connection.query(
          `INSERT INTO product_variants
           (product_id, variant_group, variant_key, variant_value)
           VALUES (?, ?, ?, ?)`,
          [id, variant.variant_group, key, value]
        );
      }
    }

    await connection.commit();

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    });

  } catch (error) {
    await connection.rollback();
    console.error("UPDATE PRODUCT ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}
