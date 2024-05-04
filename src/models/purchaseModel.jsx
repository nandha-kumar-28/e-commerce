import mongoose from "mongoose";

const buySchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: [true, "Please provide User Name"],
    unique: true,
  },
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
  mobileNo: {
    type: Number,
    required: [true, "Please provide a Mobile No"],
    unique: false,
  },
  address: {
    type: String,
    required: [true, "Please provide Address"],
    unique: false,
  },
  landmark: {
    type: String,
    required: [true, "Please provide Landmark"],
    unique: false,
  },
});

const Purchase =
  mongoose.models.purchaselist || mongoose.model("purchaselist", buySchema);

export default Purchase;
