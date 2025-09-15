import express from "express";
import Tenant from "../models/Tenant.js";
import { authMiddleware, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// ✅ Upgrade tenant plan (Admin only)
router.post("/:slug/upgrade", authMiddleware, adminOnly, async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ slug: req.params.slug });
    if (!tenant) return res.status(404).json({ error: "Tenant not found" });

    // Ensure admin can only upgrade their own tenant
    if (tenant._id.toString() !== req.user.tenantId) {
      return res.status(403).json({ error: "You cannot upgrade another tenant" });
    }

    tenant.plan = "pro";
    await tenant.save();

    res.json({ success: true, plan: tenant.plan });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
