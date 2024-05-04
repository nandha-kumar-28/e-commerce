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
    type: Number,
    required: [true, "Please provide a quantity"],
    unique: false,
  },
  productDescription: {
    type: String,
    required: [true, "Please provide product Description"],
    unique: false,
  },
  purchaseCount: {
    type: Number,
    required: [true, "Please provide purchase Count"],
    unique: false,
  },
  inStack: {
    type: Number,
    required: [true, "Please provide In - Stack"],
    unique: false,
  },
});

const Product =
  mongoose.models.products || mongoose.model("products", productSchema);

export default Product;
