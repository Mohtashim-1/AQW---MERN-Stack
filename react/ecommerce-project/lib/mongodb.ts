// This file connects our app to MongoDB database
import mongoose from 'mongoose';

// This function connects to MongoDB
// We'll call this function whenever we need to talk to the database
async function connectDB() {
  try {
    // Get the MongoDB connection string from environment variables
    // This is like the address to find our database
    // If not in .env.local, use default with explicit database name "ecommerce"
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

    // If we don't have a connection string, show an error
    // if (!MONGODB_URI) {
    //   throw new Error('Please add MONGODB_URI in .env.local file');
    // }

    // Connect to MongoDB using the connection string
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB!');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    throw error;
  }
}

export default connectDB;
