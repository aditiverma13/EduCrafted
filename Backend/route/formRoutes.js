// Backend/route/formRoutes.js
import express from "express";
import Form from "../model/Form.js";

const router = express.Router();

// GET all forms
router.get("/", async (req, res) => {
  try {
    const forms = await Form.find();
    res.json({ data: forms }); // ✅ wrap in { data: ... }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;


