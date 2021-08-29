import express from "express";
import mongoose from "mongoose";

import Memory from "../db/memoryModel.js";

const router = express.Router();

// get all memories from  db
router.get("/", async (req, res) => {
  try {
    const memories = await Memory.find();
    res.status(200).json(memories);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
    console.log(error);
  }
  // res.json({ message: "get all memories from database" });
});

// get single memories from  db
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      res.status(404).json({
        message: "Memory id is not valid",
      });
    const memory = await Memory.findById(id);
    if (!memory) return;
    res.status(200).json(memory);
  } catch (error) {
    res.status(404).json({
      message: "Memory not found",
    });
  }

  //res.json({ message: "get single memories from database" });
});

// create a memory
router.post("/", async (req, res) => {
  try {
    const memory = req.body;
    const createdMemory = await Memory.create(memory);
    res.status(201).json(createdMemory);
  } catch (error) {
    res.json({
      message: "Create memory failed.",
    });
  }
  // res.json({ message: "create a memory" });
});

// update a memory
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      res.status(404).json({
        message: "Memory id is not valid",
      });

    const { title, content, creator, image } = req.body;

    const updatedMemory = await Memory.findByIdAndUpdate(
      id,
      {
        title,
        content,
        creator,
        image,
        _id: id,
      },
      { new: true }
    );

    res.status(200).json(updatedMemory);
  } catch (error) {
    res.json({
      message: "Update memory failed.",
    });
  }

  //res.json({ message: "update a memory" });
});

// delete a memory
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      res.status(404).json({
        message: "Memory id is not valid",
      });

    await Memory.findByIdAndDelete(id);
    res.status(200).json({ message: "Memory has been deleted." });
  } catch (error) {
    res.json({
      message: "delete memory failed.",
    });
  }
  // res.json({ message: "delete a memory" });
});

export default router;
