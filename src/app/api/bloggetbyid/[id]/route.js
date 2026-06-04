import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";


// ✅ GET /api/bloggetbyid/[slug]
export async function GET(req, { params }) {
  try {
    const { id } = params; // 👈 change here
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID parameter is missing" },
        { status: 400 }
      );
    }

    const [rows] = await db.execute(`SELECT * FROM blogs WHERE slug = ?`, [
      id, // 👈 use id here
    ]);

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog: rows[0] });
  } catch (err) {
    console.error("Error fetching blog:", err);
    return NextResponse.json(
      { success: false, message: "Error fetching blog", error: err.message },
      { status: 500 }
    );
  }
}

