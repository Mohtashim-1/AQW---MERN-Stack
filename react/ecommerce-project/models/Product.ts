// This file defines what a Product looks like in our database
import mongoose, { Schema, Document } from 'mongoose';

// Define the Product structure (like a blueprint)
// This tells MongoDB what fields each product should have
const ProductSchema = new Schema(
  {
    // Product name (required field)
    name: {
      type: String,
      required: true, // This field must be filled
    },
    // Product description (required field)
    description: {
      type: String,
      required: true,
    },
    // Product price (required field, must be a number)
    price: {
      type: Number,
      required: true,
      min: 0, // Price can't be negative
    },
    // Optional fields (can be empty)
    image: {
      type: String,
      required: false, // This field is optional
    },
    category: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      default: 0, // If not provided, default to 0
    },
  },
  {
    // This automatically adds createdAt and updatedAt fields
    timestamps: true,
  }   
);

// Create the Product model
// This is like a tool we use to create and find products in the database
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
