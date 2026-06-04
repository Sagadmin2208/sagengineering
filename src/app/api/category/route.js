import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { Buffer } from "buffer";

/* ======================================================
   POST — CREATE CATEGORY (WITH IMAGE)
====================================================== */
export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const imageFile = formData.get("image");

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Valid category name is required" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();

    // duplicate check
    const [check] = await db.execute(
      "SELECT id FROM category WHERE name = ?",
      [trimmedName]
    );
    if (check.length > 0) {
      return NextResponse.json(
        { success: false, message: "Category already exists" },
        { status: 400 }
      );
    }

    // image (base64)
    let imageBase64 = null;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageBase64 = buffer.toString("base64");
    }

    const [result] = await db.execute(
      `INSERT INTO category (name, image, createdAt, updatedAt)
       VALUES (?, ?, NOW(), NOW())`,
      [trimmedName, imageBase64]
    );

    return NextResponse.json({
      success: true,
      message: "Category created successfully",
      insertId: result.insertId,
    });

  } catch (err) {
    console.error("❌ CREATE CATEGORY ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Error creating category" },
      { status: 500 }
    );
  }
}

/* ======================================================
   GET — LIST CATEGORIES
====================================================== */
export async function GET() {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM category ORDER BY createdAt ASC"
    );

    return NextResponse.json({
      success: true,
      categories: rows,
    });
  } catch (err) {
    console.error("❌ FETCH CATEGORY ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Error fetching categories" },
      { status: 500 }
    );
  }
}

/* ======================================================
   PUT — UPDATE CATEGORY (NAME + IMAGE)
====================================================== */
export async function PUT(req) {
  try {
    const formData = await req.formData();

    const id = Number(formData.get("id"));
    const name = formData.get("name");
    const imageFile = formData.get("image");

    // =====================
    // VALIDATION
    // =====================
    if (!id || !name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Category id and valid name required" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();

    // =====================
    // CHECK CATEGORY EXISTS
    // =====================
    const [[existing]] = await db.execute(
      "SELECT id FROM category WHERE id = ?",
      [id]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    // =====================
    // DUPLICATE NAME CHECK
    // =====================
    const [dup] = await db.execute(
      "SELECT id FROM category WHERE name = ? AND id != ?",
      [trimmedName, id]
    );

    if (dup.length > 0) {
      return NextResponse.json(
        { success: false, message: "Another category already uses this name" },
        { status: 400 }
      );
    }

    // =====================
    // IMAGE HANDLING
    // =====================
    let imageBase64 = null;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageBase64 = buffer.toString("base64");
    }

    // =====================
    // UPDATE QUERY
    // =====================
    if (imageBase64) {
      await db.execute(
        `UPDATE category
         SET name = ?, image = ?, updatedAt = NOW()
         WHERE id = ?`,
        [trimmedName, imageBase64, id]
      );
    } else {
      await db.execute(
        `UPDATE category
         SET name = ?, updatedAt = NOW()
         WHERE id = ?`,
        [trimmedName, id]
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
    });

  } catch (err) {
    console.error("❌ UPDATE CATEGORY ERROR:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Error updating category" },
      { status: 500 }
    );
  }
}

/* ======================================================
   DELETE — REMOVE CATEGORY
====================================================== */
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Category ID is required" },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      "DELETE FROM category WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (err) {
    console.error("❌ DELETE CATEGORY ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Error deleting category" },
      { status: 500 }
    );
  }
}
