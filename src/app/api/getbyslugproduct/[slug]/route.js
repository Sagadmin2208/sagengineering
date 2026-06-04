import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function GET(req, { params }) {
  const { slug } = params;
  const connection = await db.getConnection();

  try {
    // =====================
    // 1. PRODUCT
    // =====================
    const [[product]] = await connection.query(
      `SELECT * FROM products WHERE slug = ? LIMIT 1`,
      [slug]
    );

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    const productId = product.id;

    // =====================
    // 2. IMAGES
    // =====================
    const [images] = await connection.query(
      `SELECT image FROM product_images WHERE product_id = ?`,
      [productId]
    );
    const imageList = images.map(i => i.image);

    // =====================
    // 3. FEATURES
    // =====================
    const [features] = await connection.query(
      `SELECT feature FROM product_features WHERE product_id = ?`,
      [productId]
    );

    // =====================
    // 4. APPLICATIONS
    // =====================
    const [applications] = await connection.query(
      `SELECT application FROM product_applications WHERE product_id = ?`,
      [productId]
    );

    // =====================
    // 5. SPECIFICATIONS
    // =====================
    const [specifications] = await connection.query(
      `SELECT spec_key, spec_value
       FROM product_specifications
       WHERE product_id = ?`,
      [productId]
    );

    // =====================
    // 6. VARIANTS (NEW DESIGN)
    // =====================
    const [variantRows] = await connection.query(
      `
      SELECT 
        pv.variant_key,
        pvv.variant_value
      FROM product_variants pv
      JOIN product_variant_values pvv
        ON pv.id = pvv.variant_id
      WHERE pv.product_id = ?
      `,
      [productId]
    );

    // group variants → { Dimension: [], Burner: [] }
    const variantsMap = {};
    for (const row of variantRows) {
      if (!variantsMap[row.variant_key]) {
        variantsMap[row.variant_key] = [];
      }
      variantsMap[row.variant_key].push(row.variant_value);
    }

    // =====================
    // 7. FINAL RESPONSE
    // =====================
    const formattedProduct = {
      ...product,

      // main image fallback
      image:
        product.image ||
        imageList[0] ||
        "/placeholder-product.jpg",

      images: imageList,

      features: features.map(f => f.feature),

      applications: applications.map(a => a.application),

      specifications: specifications.reduce((acc, cur) => {
        acc[cur.spec_key] = cur.spec_value;
        return acc;
      }, {}),

      // ✅ FINAL VARIANTS FORMAT
      variants: Object.entries(variantsMap).map(([key, values]) => ({
        variant_key: key,
        values
      })),
    };

    return NextResponse.json({
      success: true,
      data: formattedProduct,
    });

  } catch (error) {
    console.error("GET PRODUCT BY SLUG ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}
