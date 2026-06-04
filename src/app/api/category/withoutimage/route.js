import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT id, name
      FROM category
      ORDER BY id ASC
    `);

    return NextResponse.json({
      success: true,
      categories: rows,
    });

  } catch (err) {
    console.error("❌ FETCH CATEGORY ERROR:", err);

    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}