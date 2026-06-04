import { NextResponse } from "next/server";
import { Buffer } from "buffer";
import { db } from "../../../lib/db";


export const config = {
  api: {
    bodyParser: false,
  },
};

// ========================================================
//  POST → Upload Home Image
// ========================================================
export async function POST(req) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image");

    // =====================
    // VALIDATION
    // =====================
    if (!imageFile || typeof imageFile !== "object" || imageFile.size === 0) {
      return NextResponse.json(
        { success: false, message: "Image file is required" },
        { status: 400 }
      );
    }

    // =====================
    // CONVERT IMAGE → BASE64
    // =====================
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const mimeType = imageFile.type || "image/jpeg";

    // store full data URI (easy frontend usage)
    const base64Image = `data:${mimeType};base64,${buffer.toString("base64")}`;

    // =====================
    // INSERT INTO DATABASE
    // =====================
    await db.execute(
      `INSERT INTO home_images (imageUrl, createdAt, updatedAt)
       VALUES (?, NOW(), NOW())`,
      [base64Image]
    );

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully",
    });

  } catch (err) {
    console.error("POST /api/home-images error:", err);
    return NextResponse.json(
      { success: false, message: "Error uploading image", error: err.message },
      { status: 500 }
    );
  }
}


// ========================================================
//  GET → Fetch All Images
// ========================================================
export async function GET() {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM home_images ORDER BY createdAt DESC"
    );
    return NextResponse.json({ success: true, images: rows });
  } catch (err) {
    console.error("GET /api/home-images error:", err);
    return NextResponse.json(
      { success: false, message: "Error fetching images", error: err.message },
      { status: 500 }
    );
  }
}

// ========================================================
//  DELETE → Delete Image from DB + Cloudinary
// ========================================================
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Image ID is required" },
        { status: 400 }
      );
    }

    // Check if image exists
    const [rows] = await db.execute(
      "SELECT * FROM home_images WHERE id = ? LIMIT 1",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Image not found" },
        { status: 404 }
      );
    }

    // Delete image row
    await db.execute("DELETE FROM home_images WHERE id = ?", [id]);

    return NextResponse.json({
      success: true,
      message: "Image deleted from database",
    });
  } catch (err) {
    console.error("DELETE /api/homepage error:", err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}



