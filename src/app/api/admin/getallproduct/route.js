import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function GET() {
  try {
    // 🔹 1. Get all products
    const [products] = await db.execute(`
      SELECT * FROM products
      ORDER BY created_at DESC
    `);

    // 🔹 2. Attach related data to each product
    const formattedProducts = await Promise.all(
      products.map(async (product) => {
        const productId = product.id;

        // Images
        const [images] = await db.execute(
          "SELECT image FROM product_images WHERE product_id = ?",
          [productId]
        );

        // Features
        const [features] = await db.execute(
          "SELECT feature FROM product_features WHERE product_id = ?",
          [productId]
        );

        // Applications
        const [applications] = await db.execute(
          "SELECT application FROM product_applications WHERE product_id = ?",
          [productId]
        );

        // Specifications
        const [specifications] = await db.execute(
          "SELECT spec_key, spec_value FROM product_specifications WHERE product_id = ?",
          [productId]
        );

        // Variants
        const [variants] = await db.execute(
          "SELECT variant_group, variant_key, variant_value FROM product_variants WHERE product_id = ?",
          [productId]
        );

        // 🔹 Group variants
        const groupedVariants = variants.reduce((acc, v) => {
          if (!acc[v.variant_group]) acc[v.variant_group] = [];
          acc[v.variant_group].push({
            key: v.variant_key,
            value: v.variant_value,
          });
          return acc;
        }, {});

        return {
          ...product,

          // ✅ Main image priority
          image:
            product.image ||
            images?.[0]?.image ||
            "/placeholder-product.jpg",

          images: images.map(i => i.image),

          features: features.map(f => f.feature),

          applications: applications.map(a => a.application),

          specifications: specifications.reduce((acc, s) => {
            acc[s.spec_key] = s.spec_value;
            return acc;
          }, {}),

          variants: Object.entries(groupedVariants).map(
            ([variant_group, options]) => ({
              variant_group,
              options,
            })
          ),
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: formattedProducts,
    });
  } catch (error) {
    console.error("GET ALL PRODUCTS ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
