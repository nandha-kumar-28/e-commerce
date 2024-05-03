import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    console.log("checking", reqBody);
    const { productCode } = reqBody;
    const product = await Product.findOne({ productCode });
    const response = NextResponse.json({
      message: "product edit details",
      success: true,
      data: product,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
