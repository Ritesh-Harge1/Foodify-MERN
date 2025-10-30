import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";
import path from "path";

const foodRouter = express.Router();

// ===== Image Storage Engine =====
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    // ✅ Sanitize filename to prevent CORB / broken image paths
    const ext = path.extname(file.originalname).toLowerCase(); // get file extension
    const base = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, "_")      // replace spaces with underscores
      .replace(/[()]/g, "")      // remove parentheses
      .replace(/[^a-zA-Z0-9_-]/g, "") // remove unsafe characters
      .toLowerCase();

    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

// ✅ Multer upload middleware
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error("Only image files (jpg, png, webp) are allowed!");
      error.status = 400;
      return cb(error);
    }
    cb(null, true);
  },
});

// ===== Routes =====

// ✅ Add food (admin only)
foodRouter.post("/add", authMiddleware, upload.single("image"), addFood);

// ✅ Get all foods (public)
foodRouter.get("/list", listFood);

// ✅ Remove food (admin only)
foodRouter.post("/remove", authMiddleware, removeFood);

export default foodRouter;
