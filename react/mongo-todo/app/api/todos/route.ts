import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(){
    try{
        const client = await clientPromise;
        const db = client.db('todoapp')
        const todos = await db.collection('todos').find({}).toArray()

        return NextResponse.json(todos)

    }catch(error){
        console.error("Error", error)
        return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 })
    }
}

// post 


export async function POST(request: NextRequest){
    try{

    const body = await request.json()

    const text = body.text

    if(!text || text.trim() === ""){
        return NextResponse.json({ error: "Todos shouldn't be empty" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('todoapp')

    // new Date = Mon Dec 29 2025 21:18:27 GMT+0500 (Pakistan Standard Time)
    // dd-mm-yyyy hh:mm:ss:ms

    const insertedTodo = {
        text: body.text,
        isCompleted: false,
        createdAt : Date.now() 
    }

    const result = await db.collection('todos').insertOne(insertedTodo)
    

    const createdTodo = {
        id : result.insertedId.toString(),
        ...insertedTodo
    }

    return NextResponse.json(createdTodo, {status: 200})

    

    }catch(error){
        console.error("Error", error)
        return NextResponse.json({ error: "Failed to create todo" }, { status: 500 })
    }

}