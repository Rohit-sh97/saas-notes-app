import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["admin", "member"], default: "member" },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
