import mongoose from "mongoose";
const productsSchema = new mongoose.Schema({
  name: String,
  price: Number,
});
const Products =
  mongoose.models.Products || mongoose.model("Products", productsSchema);

export default Products;
