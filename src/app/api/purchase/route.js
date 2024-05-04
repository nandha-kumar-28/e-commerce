import { connect } from "@/dbConfig/dbConfig";
import Purchase from "@/models/purchaseModel";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

connect();
// Calls the connect function to establish a connection to the database.

export async function POST(request) {
  // Defines an asynchronous POST request handler.
  try {
    // const reqBody = await request.json();
    // console.log("res", reqBody);
    // const { productName, productCode, emailId, mobileNo, address, landmark } =
    //   reqBody;

    // const product = await Product.findOne({ productCode });
    // console.log("productlistc checkin", product);
    // const filterData = {
    //   inStack: product["inStack"] - 1,
    //   purchaseCount: product?.purchaseCount + 1,
    // };
    // console.log("product", filterData);
    //If yes, returns a 400 response.
    // if (user) {
    //   return NextResponse.json(
    //     {
    //       errorTitle: "User already exists",
    //       errordescription: "Please try with another login credentials",
    //     },
    //     { status: 400 }
    //   );
    // }

    // //hash password using bcryptjs.
    // const salt = await bcryptjs.genSalt(10);
    // const hashedPassword = await bcryptjs.hash(password, salt);

    // const newUser = new User({
    //   username,
    //   email,
    //   password: hashedPassword,
    //   isAdmin,
    // });

    // // Saves the new user to the database.
    // const savedUser = await newUser.save();
    const response = NextResponse.json({
      message: "Purchase successful",
      success: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { errorTitle: error.message, errordescription: error.message },
      { status: 500 }
    );
  }
}
