'use client'
import { useState, useEffect } from "react"

interface Todo {
    _id: string
    text: string
    isCompleted: boolean
    createdAt: string
}

export default function TodosPage() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [inputText, setInputText] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/todos')
            const data = await response.json()
            setTodos(data)
        } catch (error) {
            console.error("Failed to fetch todos", error)
        } finally {
            setLoading(false)
        }
    }

    const createTodo = async () =>{
        if(!inputText.trim()) return

        try{
            const response = await fetch('/api/todos',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({text: inputText})
            })

            if (response.ok){
                setInputText('')
                fetchTodos()
            }

        }catch(error){
            console.error("Failed to create todo", error)
        }
    }


    return (
        <div>
            <h1>Todos</h1>

            <input type="text" value={inputText} 
            onChange={(e) => setInputText(e.target.value)} 
            onKeyPress={ (e) => e.key === "Enter" && createTodo()} placeholder="Add Todo" />
            <button onClick={createTodo}>Add Todo</button>

            {loading ? <p>Loading</p>: (
                <ul>
                    {todos.map((todo)=>(
                        <li key={todo._id}>
                            {todo._id} | 
                            {todo.text} | 
                             {todo.createdAt} | 
                            {todo.isCompleted} 

                        </li>
                    ))}
                </ul>
            )}
            
        </div>
    )
}