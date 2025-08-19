// Backend/models/Form.js
import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  createdAt: { type: Date, default: Date.now },
  // add other fields as needed
});

const Form = mongoose.model("Form", formSchema);

export default Form;

