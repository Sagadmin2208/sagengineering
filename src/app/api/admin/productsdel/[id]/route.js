import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    // 🔹 Transaction for safety
    await db.execute("START TRANSACTION");

    // 🔹 Delete related tables first
    await db.execute("DELETE FROM product_images WHERE product_id = ?", [id]);
    await db.execute("DELETE FROM product_features WHERE product_id = ?", [id]);
    await db.execute("DELETE FROM product_applications WHERE product_id = ?", [id]);
    await db.execute("DELETE FROM product_specifications WHERE product_id = ?", [id]);
    await db.execute("DELETE FROM product_variants WHERE product_id = ?", [id]);

    // 🔹 Delete main product
    const [result] = await db.execute(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      await db.execute("ROLLBACK");
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    await db.execute("COMMIT");

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    await db.execute("ROLLBACK");
    console.error("DELETE PRODUCT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
