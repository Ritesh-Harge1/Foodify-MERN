// backend/models/foodModel.js
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  public_id: { type: String },
  // ✅ Add rating
  rating: {
    type: Number,
    default: () => Math.floor(Math.random() * 2) + 4, // random 4 or 5
  },
});

export default mongoose.model("food", foodSchema);
