// mern-food-delivery-app/backend/models/foodModel.js
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    // New: rating stored as Number (e.g. 4.5)
    rating: { type: Number, required: true }
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
