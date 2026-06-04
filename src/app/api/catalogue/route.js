import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Buffer } from "buffer";
import { db } from "../../../lib/db";

import cloudinary from "../../../lib/cloudinary";

export const config = {
  api: {
    bodyParser: false, // important for file uploads
  },
};

// --- POST: Create Product ---
export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const categoryIdRaw = formData.get("categoryId");
    const description = formData.get("description");
    const imageFile = formData.get("image");
    const pdfFile = formData.get("pdf");

    if (!name) {
      return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
    }

    // --- Validate categoryId ---
    let categoryId = null;
    if (categoryIdRaw) {
      const idNum = parseInt(categoryIdRaw);
      if (!isNaN(idNum)) {
        // Check if category exists
        const [catRows] = await db.execute("SELECT id FROM category WHERE id = ?", [idNum]);
        if (catRows.length > 0) categoryId = idNum;
      }
    }

    // --- Upload image to Cloudinary ---
    let imageUrl = null;
    if (imageFile && typeof imageFile === "object") {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "products/images" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }).end(buffer);
      });
      imageUrl = uploadRes.secure_url;
    }

    // --- Upload PDF to Cloudinary ---
    let pdfUrl = null;
    if (pdfFile && typeof pdfFile === "object") {
      const buffer = Buffer.from(await pdfFile.arrayBuffer());
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "raw", folder: "products/pdfs" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        ).end(buffer);
      });
      pdfUrl = uploadRes.secure_url;
    }

    // --- Insert product into DB ---
    const id = uuidv4();
    await db.execute(
      `INSERT INTO product_catalogue (id, name, categoryId, imageUrl, pdfFile, description, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [id, name, categoryId, imageUrl, pdfUrl, description || null]
    );

    return NextResponse.json({
      success: true,
      message: "Product added successfully",
      id,
      imageUrl,
      pdfUrl,
    });
  } catch (err) {
    console.error("POST /api/catalogue error:", err);
    return NextResponse.json(
      { success: false, message: "Error creating product", error: err.message },
      { status: 500 }
    );
  }
}

// --- GET: Fetch all products ---


export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT 
        p.*, 
        c.name AS categoryName
      FROM 
        product_catalogue p
      LEFT JOIN 
        category c 
      ON 
        p.categoryId = c.id
      ORDER BY 
        p.createdAt DESC
    `);

    return NextResponse.json({ success: true, products: rows });
  } catch (err) {
    console.error("GET /api/catalogue error:", err);
    return NextResponse.json(
      { success: false, message: "Error fetching products", error: err.message },
      { status: 500 }
    );
  }
}

