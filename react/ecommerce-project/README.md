# E-Commerce Project - Learning Project

This is a simple e-commerce project built with Next.js and MongoDB. Perfect for students learning web development!

## 🎯 What You'll Learn

- How to create API routes in Next.js
- How to connect to MongoDB database
- How to save data (POST request)
- How to get data (GET request)
- How to build a simple frontend with React

## 📚 Project Structure (Simple Explanation)

```
app/
  ├── page.tsx          ← Main page (what users see)
  └── api/
      └── products/
          └── route.ts  ← Backend code (API endpoints)

lib/
  └── mongodb.ts        ← Connects to database

models/
  └── Product.ts        ← Defines what a product looks like
```

## ✨ Features

- ✅ Create products (POST request)
- ✅ Get all products (GET request)
- ✅ Simple and easy to understand code
- ✅ Lots of comments explaining everything

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)

### Setup Instructions (Step by Step)

**Step 1: Install dependencies**
```bash
npm install
```

**Step 2: Set up MongoDB**

You need a MongoDB database. Choose one option:

**Option A: Local MongoDB (if installed on your computer)**
- Create a file named `.env.local` in the project root
- Add this line:
  ```
  MONGODB_URI=mongodb://localhost:27017/ecommerce
  ```

**Option B: MongoDB Atlas (free cloud database)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free
3. Create a cluster
4. Get your connection string
5. Create `.env.local` file and add:
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/ecommerce
   ```

**Step 3: Run the app**
```bash
npm run dev
```

**Step 4: Open in browser**
Go to: http://localhost:3000

## 📡 How the API Works (For Students)

### GET /api/products
**What it does:** Gets all products from the database

**How to test:**
- Open browser: http://localhost:3000/api/products
- Or use the frontend (products load automatically)

### POST /api/products
**What it does:** Creates a new product

**Required fields:**
- `name` - Product name
- `description` - Product description  
- `price` - Product price (number)

**Optional fields:**
- `image` - Image URL
- `category` - Product category
- `stock` - Stock quantity

**How it works:**
1. User fills out the form on the webpage
2. Form sends data to `/api/products` with POST method
3. Backend saves it to MongoDB
4. Product appears in the list!

## 💡 Learning Tips

1. **Read the comments** - Every file has comments explaining what each part does
2. **Start with `lib/mongodb.ts`** - Learn how database connection works
3. **Then check `models/Product.ts`** - Understand the data structure
4. **Look at `app/api/products/route.ts`** - See how GET and POST work
5. **Finally `app/page.tsx`** - See how frontend talks to backend

## 📁 Project Structure Explained

```
app/
  ├── page.tsx              ← Frontend (what users see)
  └── api/
      └── products/
          └── route.ts      ← Backend API (GET and POST)

lib/
  └── mongodb.ts            ← Connects to database

models/
  └── Product.ts            ← Defines product structure
```

**What each file does:**
- `page.tsx` - The webpage with the form and product list
- `route.ts` - The backend code that saves/gets data
- `mongodb.ts` - Handles database connection
- `Product.ts` - Tells MongoDB what a product looks like

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
