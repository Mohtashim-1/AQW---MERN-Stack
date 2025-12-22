import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

// /home/mohtashim/al_qadir/react/next-2/my-app/lib/mongodb.ts

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('todoapp')
    const todos = await db.collection('todos').find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(todos, { status: 200 })
  } catch (error) {
    console.error('Error fetching todos:', error)
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // { text: 'Hello',
    //  completed: false,
    //  createdAt: '2025-01-01'
    // }
    const text = body

    if (!text || text.trim() === '') {
      return NextResponse.json({ error: 'Todo text is required' }, { status: 400 })
    }

    const client = await clientPromise // connect to mongodb
    const db = client.db('todoapp') // get the database
    
    const newTodo = {
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }

    // {
    //   _id: '',
    //   text: 'Hello',
    //   completed: false,
    //   createdAt: '2025-01-01',
    // }

    const result = await db.collection('todos').insertOne(newTodo)
//123
    // result.insertedId.toString()


    // {
    //   _id: '123',
    //   text: 'Hello',
    //   completed: false,
    //   createdAt: '2025-01-01',
    // }
    const createdTodo = {
      _id: result,
      ...newTodo,
    }


    return NextResponse.json(createdTodo, { status: 201 })
  } catch (error) {
    console.error('Error creating todo:', error)
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 })
  }
}

