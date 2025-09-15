import express from "express";
import Note from "../models/Note.js";
import Tenant from "../models/Tenant.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// ✅ Create a note (respect free plan limit)
router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const { userId, tenantId } = req.user;

  try {
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) return res.status(404).json({ error: "Tenant not found" });

    if (tenant.plan === "free") {
      const count = await Note.countDocuments({ tenantId });
      if (count >= 3) {
        return res.status(403).json({ error: "Free plan limit reached" });
      }
    }

    const note = await Note.create({ title, content, tenantId, authorId: userId });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get all notes (only for current tenant)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ tenantId: req.user.tenantId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get one note
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, tenantId: req.user.tenantId });
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update note
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.user.tenantId },
      { title: req.body.title, content: req.body.content },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Delete note
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, tenantId: req.user.tenantId });
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
