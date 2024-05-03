import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Please provide product name"],
        unique: true,
    },
    productCode: {
        type: String,
        required: [true, "Please provide product code"],
        unique: true,
    },
    quantity: {
       type: String,
       required: [true, "Please provide a quantity"],
       unique:true
    },
    productDescription: {
        type: String,
        required: [true, "Please provide product Description"],
        unique: true,
    },
})

const Product = mongoose.models.products || mongoose.model("products", productSchema);

export default Product;