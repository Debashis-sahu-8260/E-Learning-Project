const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Product = require("../models/prod.model");

// Get all products
router.get("/", async (req, res) => {
  try {
    let products = await Product.find().lean().exec();
    return res.status(200).send(products);
  } catch (err) {
    return res.status(500).send({ message: "Error fetching products: " + err.message });
  }
});

// Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id).lean().exec();
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send({ message: "Error fetching product: " + err.message });
  }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id).exec();
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res.status(204).send(); // No content to send back
  } catch (err) {
    return res.status(500).send({ message: "Error deleting product: " + err.message });
  }
});

// Update a product (PATCH)
router.patch("/:id", async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(
      req.params.id,  // use _id here
      req.body,
      { new: true } // Return the updated document
    ).lean().exec();

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send({ message: "Error updating product: " + err.message });
  }
});

// Replace a product (PUT)
router.put("/:id", async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(
      req.params.id,  // use _id here
      req.body,
      { new: true } // Return the updated document
    ).lean().exec();

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send({ message: "Error replacing product: " + err.message });
  }
});

// Create a new product (course)
router.post("/", async (req, res) => {
  try {
    const {
      title,
      price,
      category,
      sub_category,
      topic,
      author,
      date,
      image,
      qty,
      level,
      details,
    } = req.body;

    // Validate required fields
    if (!title || !price || !category || !sub_category || !topic || !author || !date || !image || !qty || !level || !details) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const product = await Product.create({
      title,
      price,
      category,
      sub_category,
      topic,
      author,
      date: new Date(date), // Make sure date is in correct format
      image,
      qty,
      level,
      details,
    });

    return res.status(201).send(product); // Return 201 Created
  } catch (err) {
    return res.status(500).send({ message: "Error creating product: " + err.message });
  }
});

module.exports = router;
