import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request) {
  // Defines an asynchronous POST request handler.
  try {
    const reqBody = await request.json();
    const {
      productName,
      productCode,
      quantity,
      productDescription,
      inStack,
      purchaseCount,
    } = reqBody;
    const product = await Product.findOne({ productCode });

    //If yes, returns a 400 response.
    if (product) {
      return NextResponse.json(
        {
          errorTitle: "Product already exists",
          errordescription: "Please try with different Product Code",
        },
        { status: 400 }
      );
    }

    const newProduct = new Product({
      productName,
      productCode,
      quantity,
      productDescription,
      inStack,
      purchaseCount,
    });

    // Saves the new prduct to the database.
    const savedUser = await newProduct.save();

    return NextResponse.json({
      message: "Product created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { errorTitle: error.message, errordescription: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const product = await Product.find({});
    const response = NextResponse.json({
      message: "product list",
      success: true,
      data: product,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { errorTilte: error.message, errordescription: error.message },
      { status: 500 }
    );
  }
}
