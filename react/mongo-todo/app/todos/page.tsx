'use client'
import React from "react"
import { useState, useEffect } from "react"
import { NextResponse } from "next/server"

interface Todo{
    _id: string,
    text: string,
    date : string,
    completed: boolean
}


const TestMongoPage = () => {
    const [todos, setTodos] = useState<Todo[]>([]) 
    const [inputText, setInputText] = useState('')
    const [filter, setFilter] = useState<'all' | 'completed' | 'pending'> ('all')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        fetchTodos()
    },[])

    // Simple ()
    // Curly {}
    // Square []

    const fetchTodos = async ()=>{
        try{
            setLoading(true)
            const response = await fetch('/api/todos',{
                method: 'GET',
                headers:{
                    'content-type': 'application/json'
                }
            })

            const data = await response.json()

            return NextResponse.json(data, {status: 200})

        }catch(error){
            console.log("Failed to fetch todos from db", error)
        }
    }

  return (
    <div>page</div>
  )
}

export default TestMongoPage