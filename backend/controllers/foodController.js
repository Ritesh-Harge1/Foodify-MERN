import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";

// ✅ Add Food Item
const addFood = async (req, res) => {
  try {
    // Ensure image exists
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image upload failed!" });
    }

    const image_filename = `${req.file.filename}`;
    const { name, description, price, category } = req.body;

    // ✅ Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    // ✅ Get user from token (set in authMiddleware)
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const userData = await userModel.findById(userId);
    if (!userData || userData.role !== "admin") {
      return res.status(403).json({ success: false, message: "You are not admin" });
    }

    // ✅ Create new food item
    // compute random rating between 2.5 and 5.0, rounded to 1 decimal
const randomRating = Number((Math.random() * (5 - 2.5) + 2.5).toFixed(1));

const newFood = new foodModel({
  name,
  description,
  price,
  category,
  image: image_filename,
  rating: randomRating,
});


    await newFood.save();

    // ✅ Always send a response!
    return res.status(200).json({
      success: true,
      message: "Food item added successfully!",
      data: newFood,
    });
  } catch (error) {
    console.error("Error in addFood:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding food.",
    });
  }
};

// ✅ List All Foods
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    // Append full URL for each food item
    const updatedFoods = foods.map(food => ({
      ...food._doc,
      image: `${process.env.BACKEND_URL || "http://localhost:4000"}/uploads/${food.image}`
    }));
    return res.json({ success: true, data: updatedFoods });
  } catch (error) {
    console.error("Error in listFood:", error);
    return res.json({ success: false, message: "Error fetching foods." });
  }
};

// ✅ Remove Food
const removeFood = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    if (!userData || userData.role !== "admin") {
      return res.status(403).json({ success: false, message: "You are not admin" });
    }

    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Delete image file safely
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.log("Image delete error:", err);
    });

    await foodModel.findByIdAndDelete(req.body.id);

    return res.json({ success: true, message: "Food removed successfully!" });
  } catch (error) {
    console.error("Error in removeFood:", error);
    return res.json({ success: false, message: "Server error removing food." });
  }
};

export { addFood, listFood, removeFood };
