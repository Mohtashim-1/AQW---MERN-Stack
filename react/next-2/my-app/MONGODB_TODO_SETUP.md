# MongoDB Todo Application - Complete Setup Guide

This document provides a step-by-step guide to set up MongoDB for a Todo application with Next.js, including all functions and their explanations.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Step 1: Install MongoDB](#step-1-install-mongodb)
3. [Step 2: Install MongoDB Driver for Node.js](#step-2-install-mongodb-driver-for-nodejs)
4. [Step 3: Create MongoDB Connection File](#step-3-create-mongodb-connection-file)
5. [Step 4: Create API Routes](#step-4-create-api-routes)
6. [Step 5: Create Frontend Components](#step-5-create-frontend-components)
7. [Step 6: Test the Application](#step-6-test-the-application)
8. [Function Reference](#function-reference)

---

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Next.js project set up
- MongoDB installed locally or MongoDB Atlas account

---

## Step 1: Install MongoDB

### Option A: Local MongoDB Installation

**For Ubuntu/Debian:**
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package list
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
```

**For macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

**For Windows:**
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer
3. MongoDB will start automatically as a Windows service

### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

---

## Step 2: Install MongoDB Driver for Node.js

In your Next.js project directory, install the MongoDB driver:

```bash
npm install mongodb
```

Or if using yarn:
```bash
yarn add mongodb
```

This will add MongoDB to your `package.json` dependencies.

---

## Step 3: Create MongoDB Connection File

Create a file at `lib/mongodb.ts` to handle MongoDB connections:

```typescript
import { MongoClient } from 'mongodb'

// MongoDB connection URI
// For local MongoDB: 'mongodb://localhost:27017'
// For MongoDB Atlas: process.env.MONGODB_URI (from .env.local file)
const uri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017'

// Create a new MongoClient instance
const client = new MongoClient(uri)

// Create a promise that resolves to the connected client
// This allows us to reuse the connection across multiple requests
const clientPromise = client.connect()

// Export the promise so other files can use it
export default clientPromise
```

### Environment Variables (Optional but Recommended)

Create a `.env.local` file in your project root:

```env
MONGODB_URI=mongodb://localhost:27017
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
```

**Note:** Never commit `.env.local` to version control. Add it to `.gitignore`.

---

## Step 4: Create API Routes

### 4.1 Create GET and POST Route (`app/api/todos/route.ts`)

This route handles fetching all todos (GET) and creating new todos (POST).

```typescript
import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

// GET: Fetch all todos
export async function GET() {
  try {
    // Connect to MongoDB
    const client = await clientPromise
    
    // Select the database (creates it if it doesn't exist)
    const db = client.db('todoapp')
    
    // Get the todos collection and fetch all documents
    // Sort by createdAt in descending order (newest first)
    const todos = await db.collection('todos').find({}).sort({ createdAt: -1 }).toArray()
    
    // Return todos as JSON
    return NextResponse.json(todos, { status: 200 })
  } catch (error) {
    console.error('Error fetching todos:', error)
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 })
  }
}

// POST: Create a new todo
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    const text = body.text || body // Handle both {text: "..."} and "..." formats
    
    // Validate input
    if (!text || text.trim() === '') {
      return NextResponse.json({ error: 'Todo text is required' }, { status: 400 })
    }
    
    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db('todoapp')
    
    // Create new todo object
    const newTodo = {
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }
    
    // Insert the new todo into the collection
    const result = await db.collection('todos').insertOne(newTodo)
    
    // Create the response object with the generated _id
    const createdTodo = {
      _id: result.insertedId.toString(),
      ...newTodo,
    }
    
    // Return the created todo
    return NextResponse.json(createdTodo, { status: 201 })
  } catch (error) {
    console.error('Error creating todo:', error)
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 })
  }
}
```

### 4.2 Create PUT and DELETE Route (`app/api/todos/[id]/route.ts`)

This route handles updating (PUT) and deleting (DELETE) individual todos by ID.

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'

// PUT: Update a todo (toggle completed status or update text)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the todo ID from the URL parameters
    const { id } = params
    
    // Validate that ID exists
    if (!id) {
      return NextResponse.json({ error: 'Todo ID is required' }, { status: 400 })
    }
    
    // Validate that ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid todo ID' }, { status: 400 })
    }
    
    // Parse the request body
    const body = await request.json()
    
    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db('todoapp')
    
    // Prepare the update data object
    const updateData: any = {}
    
    // Only update fields that are provided in the request
    if (body.completed !== undefined) {
      updateData.completed = body.completed
    }
    if (body.text !== undefined) {
      updateData.text = body.text.trim()
    }
    
    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }
    
    // Update the todo in the database
    // $set operator updates only the specified fields
    const result = await db.collection('todos').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )
    
    // Check if todo was found
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }
    
    // Fetch and return the updated todo
    const updatedTodo = await db.collection('todos').findOne({
      _id: new ObjectId(id),
    })
    
    return NextResponse.json(updatedTodo, { status: 200 })
  } catch (error) {
    console.error('Error updating todo:', error)
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 })
  }
}

// DELETE: Delete a todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the todo ID from the URL parameters
    const { id } = params
    
    // Validate that ID exists
    if (!id) {
      return NextResponse.json({ error: 'Todo ID is required' }, { status: 400 })
    }
    
    // Validate that ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid todo ID' }, { status: 400 })
    }
    
    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db('todoapp')
    
    // Delete the todo from the database
    const result = await db.collection('todos').deleteOne({
      _id: new ObjectId(id),
    })
    
    // Check if todo was found and deleted
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting todo:', error)
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 })
  }
}
```

---

## Step 5: Create Frontend Components

Create a frontend page at `app/todo-mongo/page.tsx`:

```typescript
'use client'

import { useState, useEffect } from 'react'

// Define the Todo interface
interface Todo {
  _id: string
  text: string
  completed: boolean
  createdAt: string
}

export default function TodoMongoApp() {
  // State management
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos()
  }, [])

  // Function to fetch all todos from the API
  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }
      
      const data = await response.json()
      setTodos(data)
    } catch (err) {
      console.error('Error fetching todos:', err)
      setError('Failed to load todos. Please check your MongoDB connection.')
    } finally {
      setLoading(false)
    }
  }

  // Function to format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${day}/${month}/${year}, ${hours}:${minutes}`
  }

  // Function to add a new todo
  const addTodo = async () => {
    if (inputText.trim() === '') return

    try {
      setError(null)
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText.trim() }),
      })

      if (!response.ok) {
        throw new Error('Failed to create todo')
      }

      const newTodo = await response.json()
      // Add new todo to the beginning of the list
      setTodos([newTodo, ...todos])
      setInputText('')
    } catch (err) {
      console.error('Error creating todo:', err)
      setError('Failed to create todo. Please try again.')
    }
  }

  // Function to toggle todo completion status
  const toggleTodo = async (id: string) => {
    const todo = todos.find(t => t._id === id)
    if (!todo) return

    try {
      setError(null)
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      })

      if (!response.ok) {
        throw new Error('Failed to update todo')
      }

      const updatedTodo = await response.json()
      // Update the todo in the list
      setTodos(todos.map(t => (t._id === id ? updatedTodo : t)))
    } catch (err) {
      console.error('Error updating todo:', err)
      setError('Failed to update todo. Please try again.')
    }
  }

  // Function to delete a todo
  const deleteTodo = async (id: string) => {
    try {
      setError(null)
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete todo')
      }

      // Remove the todo from the list
      setTodos(todos.filter(todo => todo._id !== id))
    } catch (err) {
      console.error('Error deleting todo:', err)
      setError('Failed to delete todo. Please try again.')
    }
  }

  // Function to clear all completed todos
  const clearCompleted = async () => {
    const completedTodos = todos.filter(todo => todo.completed)
    
    try {
      setError(null)
      // Delete all completed todos in parallel
      await Promise.all(
        completedTodos.map(todo => 
          fetch(`/api/todos/${todo._id}`, { method: 'DELETE' })
        )
      )
      
      // Remove completed todos from the list
      setTodos(todos.filter(todo => !todo.completed))
    } catch (err) {
      console.error('Error clearing completed todos:', err)
      setError('Failed to clear completed todos. Please try again.')
    }
  }

  // Filter todos based on selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  // Calculate counts
  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.filter(todo => todo.completed).length

  // Render the component
  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">Todo Application</h1>
          <p className="text-gray-600">Built with Next.js & MongoDB</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-3 mb-4 rounded">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white border border-gray-300 p-4 mb-4 rounded">
          {/* Input section */}
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="What needs to be done?"
                className="flex-1 border border-gray-300 px-3 py-2 rounded"
                disabled={loading}
              />
              <button
                onClick={addTodo}
                disabled={!inputText.trim() || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
              >
                Add
              </button>
            </div>
          </div>

          {/* Filter buttons */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              disabled={loading}
              className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              All ({todos.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              disabled={loading}
              className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              disabled={loading}
              className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Completed ({completedCount})
            </button>
            {completedCount > 0 && (
              <button
                onClick={clearCompleted}
                disabled={loading}
                className="ml-auto px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
              >
                Clear Completed
              </button>
            )}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-8">
              <p>Loading todos...</p>
            </div>
          )}

          {/* Todo list */}
          {!loading && (
            <div className="space-y-2 mb-4">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>
                    {filter === 'all' 
                      ? 'No todos yet. Add one above!' 
                      : filter === 'active'
                      ? 'All todos are completed!'
                      : 'No completed todos yet'}
                  </p>
                </div>
              ) : (
                filteredTodos.map(todo => (
                  <div
                    key={todo._id}
                    className={`flex items-center gap-2 p-3 border rounded ${
                      todo.completed ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo._id)}
                      className="cursor-pointer"
                      disabled={loading}
                    />
                    <span
                      className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
                    >
                      {todo.text}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(todo.createdAt)}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      disabled={loading}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Statistics */}
          <div className="border-t pt-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total: {todos.length}</span>
              <span>Active: {activeCount}</span>
              <span>Completed: {completedCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## Step 6: Test the Application

1. **Start MongoDB** (if using local installation):
   ```bash
   # Ubuntu/Debian
   sudo systemctl start mongod
   
   # macOS
   brew services start mongodb-community@7.0
   ```

2. **Start your Next.js development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:3000/todo-mongo
   ```

4. **Test the functionality**:
   - Add a new todo
   - Toggle todo completion
   - Delete a todo
   - Filter todos (All/Active/Completed)
   - Clear completed todos

---

## Function Reference

### MongoDB Connection Functions

#### `clientPromise`
- **Location**: `lib/mongodb.ts`
- **Purpose**: Creates and exports a MongoDB client connection promise
- **Usage**: Import in API routes to get database connection
- **Returns**: Promise that resolves to a connected MongoClient

### API Route Functions

#### `GET()` - Fetch All Todos
- **Route**: `/api/todos`
- **Method**: GET
- **Purpose**: Retrieves all todos from the database
- **Returns**: JSON array of todos sorted by creation date (newest first)
- **Error Handling**: Returns 500 status on database errors

#### `POST()` - Create Todo
- **Route**: `/api/todos`
- **Method**: POST
- **Purpose**: Creates a new todo in the database
- **Request Body**: `{ text: string }`
- **Returns**: Created todo object with generated `_id`
- **Error Handling**: Returns 400 for invalid input, 500 for database errors

#### `PUT()` - Update Todo
- **Route**: `/api/todos/[id]`
- **Method**: PUT
- **Purpose**: Updates a todo (completion status or text)
- **Request Body**: `{ completed?: boolean, text?: string }`
- **Returns**: Updated todo object
- **Error Handling**: Returns 400 for invalid ID, 404 if todo not found, 500 for database errors

#### `DELETE()` - Delete Todo
- **Route**: `/api/todos/[id]`
- **Method**: DELETE
- **Purpose**: Deletes a todo from the database
- **Returns**: Success message
- **Error Handling**: Returns 400 for invalid ID, 404 if todo not found, 500 for database errors

### Frontend Functions

#### `fetchTodos()`
- **Purpose**: Fetches all todos from the API
- **Updates**: `todos` state, `loading` state, `error` state
- **Called**: On component mount and can be called manually

#### `addTodo()`
- **Purpose**: Creates a new todo via API
- **Updates**: Adds new todo to `todos` state, clears `inputText`
- **Validation**: Checks if input text is not empty

#### `toggleTodo(id: string)`
- **Purpose**: Toggles the completion status of a todo
- **Updates**: Updates the specific todo in `todos` state
- **Parameter**: Todo ID

#### `deleteTodo(id: string)`
- **Purpose**: Deletes a todo via API
- **Updates**: Removes todo from `todos` state
- **Parameter**: Todo ID

#### `clearCompleted()`
- **Purpose**: Deletes all completed todos
- **Updates**: Removes all completed todos from `todos` state
- **Implementation**: Uses `Promise.all()` to delete multiple todos in parallel

#### `formatDate(dateString: string)`
- **Purpose**: Formats ISO date string to readable format
- **Returns**: Formatted string (DD/MM/YYYY, HH:MM)
- **Example**: "01/01/2025, 14:30"

---

## MongoDB Database Structure

### Database Name
- `todoapp`

### Collection Name
- `todos`

### Document Schema
```typescript
{
  _id: ObjectId,           // Auto-generated by MongoDB
  text: string,            // Todo text content
  completed: boolean,      // Completion status (default: false)
  createdAt: string        // ISO date string
}
```

### Example Document
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "text": "Learn MongoDB",
  "completed": false,
  "createdAt": "2025-01-15T10:30:00.000Z"
}
```

---

## Common Issues and Solutions

### Issue 1: MongoDB Connection Error
**Error**: `MongoServerError: connect ECONNREFUSED`
**Solution**: 
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Check connection string in `lib/mongodb.ts`
- Verify MongoDB is listening on port 27017

### Issue 2: Invalid ObjectId Error
**Error**: `Invalid todo ID`
**Solution**: 
- Ensure you're passing a valid MongoDB ObjectId (24 character hex string)
- Check that the ID hasn't been corrupted in the URL

### Issue 3: CORS Errors
**Error**: CORS policy blocking requests
**Solution**: 
- Next.js API routes handle CORS automatically
- If using external API, ensure proper CORS headers are set

### Issue 4: Environment Variables Not Loading
**Error**: `MONGODB_URI is undefined`
**Solution**: 
- Ensure `.env.local` file exists in project root
- Restart Next.js dev server after adding environment variables
- Never commit `.env.local` to version control

---

## Best Practices

1. **Connection Reuse**: The `clientPromise` pattern reuses connections, which is efficient
2. **Error Handling**: Always wrap database operations in try-catch blocks
3. **Input Validation**: Validate all user inputs before database operations
4. **Type Safety**: Use TypeScript interfaces for type checking
5. **Environment Variables**: Use environment variables for sensitive data like connection strings
6. **Indexing**: For production, consider adding indexes on frequently queried fields:
   ```typescript
   await db.collection('todos').createIndex({ createdAt: -1 })
   ```

---

## Next Steps

1. Add user authentication
2. Add categories/tags to todos
3. Add due dates and reminders
4. Implement search functionality
5. Add pagination for large todo lists
6. Add data validation using Zod or similar
7. Add unit and integration tests

---

## Additional Resources

- [MongoDB Node.js Driver Documentation](https://www.mongodb.com/docs/drivers/node/current/)
- [Next.js API Routes Documentation](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [MongoDB University](https://university.mongodb.com/) - Free MongoDB courses

---

**Document Version**: 1.0  
**Last Updated**: 2025-01-15

