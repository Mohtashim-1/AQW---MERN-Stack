// This file handles API requests for products
// GET request = Get all products
// POST request = Create a new product

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// ============================================
// GET REQUEST - Get all products from database
// ============================================
export async function GET() {
  try {
    // Step 1: Connect to MongoDB
    await connectDB();
    
    // Step 2: Find all products in the database
    // .find({}) means "find everything" (no filter)
    // .sort({ createdAt: -1 }) means "sort by newest first"
    const products = await Product.find({}).sort({ createdAt: -1 });
    
    // Step 3: Send the products back as JSON
    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    // If something goes wrong, send an error message
    console.error('Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get products',
      },
      { status: 500 }
    );
  }
}

// ============================================
// POST REQUEST - Create a new product
// ============================================
export async function POST(request: NextRequest) {
  try {
    // Step 1: Connect to MongoDB
    await connectDB();
    
    // Step 2: Get the data from the request body
    // The frontend sends data in the request body
    const body = await request.json();
    const { name, description, price, image, category, stock } = body;

    // Step 3: Check if required fields are present
    if (!name || !description || !price) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide name, description, and price',
        },
        { status: 400 }
      );
    }

    // Step 4: Create a new product in the database
    const newProduct = await Product.create({
      name,
      description,
      price,
      image: image || '',
      category: category || '',
      stock: stock || 0,
    });

    // Step 5: Send back the created product
    return NextResponse.json(
      {
        success: true,
        data: newProduct,
      },
      { status: 201 } // 201 = Created successfully
    );
  } catch (error) {
    // If something goes wrong, send an error message
    console.error('Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create product',
      },
      { status: 500 }
    );
  }
}
