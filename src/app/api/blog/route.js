import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Buffer } from "buffer";
import { db } from "../../../lib/db";

import cloudinary from "../../../lib/cloudinary";
import slugify from "slugify";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    let slug = formData.get("slug");
    const content = formData.get("content");
    const metaDescription = formData.get("metaDescription");
    const canonicalUrl = formData.get("canonicalUrl");
    const tags = formData.get("tags");
    const mainImage = formData.get("mainImage");

    // ✅ Validation
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: "Title and content are required" },
        { status: 400 }
      );
    }

    // ✅ Auto-generate slug if not provided
    slug = slug || slugify(title, { lower: true, strict: true });

    // ✅ Check for duplicate slug
    const [existing] = await db.execute("SELECT slug FROM blogs WHERE slug = ?", [slug]);
    if (existing.length > 0) {
      const randomSuffix = Math.floor(Math.random() * 10000);
      slug = `${slug}-${randomSuffix}`;
    }

    // ✅ Upload image to Cloudinary if provided
    let imageUrl = null;
    if (mainImage && typeof mainImage === "object") {
      const bytes = await mainImage.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "blogs" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(buffer);
      });

      imageUrl = uploadRes.secure_url;
    }

    // ✅ Generate UUID
    const id = uuidv4();

    // ✅ Insert into DB
    await db.execute(
      `INSERT INTO blogs 
        (id, title, slug, content, metaDescription, canonicalUrl, tags, mainImage, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [id, title, slug, content, metaDescription || null, canonicalUrl || null, tags || null, imageUrl]
    );

    // ✅ Return proper response
    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      blogId: id,
      slug,
      imageUrl,
    });
  } catch (err) {
    console.error("Error creating blog:", err);
    return NextResponse.json(
      { success: false, message: "Error creating blog", error: err.message },
      { status: 500 }
    );
  }
}

/* ✅ GET: Get all blogs */
export async function GET() {
  try {
    const [rows] = await db.execute(
      `SELECT 
        id, 
        title, 
        slug, 
        content,
        metaDescription,
        canonicalUrl,
        tags,
        mainImage,
        createdAt,
        updatedAt 
       FROM blogs 
       ORDER BY createdAt DESC`
    );

    return NextResponse.json({
      success: true,
      blogs: rows,
    });
  } catch (err) {
    console.error("❌ Error fetching blogs:", err);
    return NextResponse.json(
      { success: false, message: "Error fetching blogs", error: err.message },
      { status: 500 }
    );
  }
}
