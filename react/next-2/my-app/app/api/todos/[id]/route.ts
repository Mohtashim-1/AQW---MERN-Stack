import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'

// PUT endpoint: Update a todo (toggle completed status or update text)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the todo ID from the URL
    const { id } = params
    
    // Validate that ID exists
    if (!id) {
      return NextResponse.json({ error: 'Todo ID is required' }, { status: 400 })
    }

    // Validate that ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid todo ID' }, { status: 400 })
    }

    // Get the data from the request body
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
    const result = await db.collection('todos').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    // Check if todo was found
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }

    // Get the updated todo and return it
    const updatedTodo = await db.collection('todos').findOne({
      _id: new ObjectId(id),
    })

    return NextResponse.json(updatedTodo, { status: 200 })
  } catch (error) {
    console.error('Error updating todo:', error)
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 })
  }
}

// DELETE endpoint: Delete a todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the todo ID from the URL
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
