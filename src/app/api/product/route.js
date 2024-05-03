import {connect} from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect()
// Calls the connect function to establish a connection to the database.


export async function POST(request){
// Defines an asynchronous POST request handler.
    try {
        const reqBody = await request.json()
        console.log("res",reqBody);
        const {productName, productCode, quantity,productDescription} = reqBody
// Parses the request body to extract username, email, and password.

//Checks if a user with the provided email already exists. 
        const product = await Product.findOne({productCode})
console.log("product",product)
//If yes, returns a 400 response.
        if(product){
            return NextResponse.json({error: "Product already exists"}, {status: 400})
        }

        const newProduct = new Product({
            productName,
             productCode, 
             quantity,
             productDescription
        })

// Saves the new user to the database.
        const savedUser = await newProduct.save()


        return NextResponse.json({
            message: "Product created successfully",
            success: true,
            savedUser
        })


    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}

export async function GET(request) {
    try {
        const product = await Product.find({})
        const response = NextResponse.json(
            {
                message: "product list",
                success: true,
                data:product
            }
        )

        return response;
        
    } catch (error) {
        return NextResponse.json({ error: error.message},
            {status: 500});
    }
    
}
