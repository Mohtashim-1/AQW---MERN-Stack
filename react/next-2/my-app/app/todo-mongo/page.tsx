'use client'

import { useState, useEffect } from 'react'

interface Todo {
  _id: string
  text: string
  completed: boolean
  createdAt: string
}

export default function TodoMongoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/todos')
      
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${day}/${month}/${year}, ${hours}:${minutes}`
  }

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
      setTodos([newTodo, ...todos])
      setInputText('')
    } catch (err) {
      console.error('Error creating todo:', err)
      setError('Failed to create todo. Please try again.')
    }
  }

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
      setTodos(todos.map(t => (t._id === id ? updatedTodo : t)))
    } catch (err) {
      console.error('Error updating todo:', err)
      setError('Failed to update todo. Please try again.')
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      setError(null)
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete todo')
      }

      setTodos(todos.filter(todo => todo._id !== id))
    } catch (err) {
      console.error('Error deleting todo:', err)
      setError('Failed to delete todo. Please try again.')
    }
  }

  const clearCompleted = async () => {
    const completedTodos = todos.filter(todo => todo.completed)
    
    try {
      setError(null)
      await Promise.all(
        completedTodos.map(todo => 
          fetch(`/api/todos/${todo._id}`, { method: 'DELETE' })
        )
      )
      
      setTodos(todos.filter(todo => !todo.completed))
    } catch (err) {
      console.error('Error clearing completed todos:', err)
      setError('Failed to clear completed todos. Please try again.')
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.filter(todo => todo.completed).length

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

          {loading && (
            <div className="text-center py-8">
              <p>Loading todos...</p>
            </div>
          )}

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
