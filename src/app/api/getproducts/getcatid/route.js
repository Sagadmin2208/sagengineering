import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function GET(req) {
  const connection = await db.getConnection();

  try {
    const { searchParams } = new URL(req.url);

    const categoryId = searchParams.get("categoryId");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;

    if (!categoryId) {
      return NextResponse.json(
        { success: false, message: "categoryId is required" },
        { status: 400 }
      );
    }

    // =====================
    // GET TOTAL COUNT
    // =====================
    const [[countResult]] = await connection.query(
      `
      SELECT COUNT(*) as total
      FROM products p
      JOIN category c ON p.category = c.name
      WHERE c.id = ?
      `,
      [categoryId]
    );

    const total = countResult.total;
    const totalPages = Math.ceil(total / limit);

    // =====================
    // GET PAGINATED PRODUCTS
    // =====================
    const [products] = await connection.query(
      `
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.category,
        p.short_description,

        COALESCE(p.image, pi.image) AS image

      FROM products p

      JOIN category c ON p.category = c.name

      LEFT JOIN (
        SELECT product_id, MIN(image) AS image
        FROM product_images
        GROUP BY product_id
      ) pi ON p.id = pi.product_id

      WHERE c.id = ?

      ORDER BY p.id DESC
      LIMIT ? OFFSET ?
      `,
      [categoryId, limit, offset]
    );

    return NextResponse.json({
      success: true,
      page,
      total,
      totalPages,
      data: products
    });

  } catch (error) {
    console.error("GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message
      },
      { status: 500 }
    );

  } finally {
    connection.release();
  }
}