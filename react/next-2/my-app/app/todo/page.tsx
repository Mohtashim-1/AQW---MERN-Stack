'use client'

import { useState, useEffect } from 'react'

// Define the type for a todo item
interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: string
}



export default function TodoApp() {
  // =========================================
  // STEP 1: useState - Managing Todo State
  // ============================================
  // useState is used to store our list of todos and the input text
  // When these values change, React automatically re-renders the component
  
  const [todos, setTodos] = useState<Todo[]>([]) // Array of todo items
  const [inputText, setInputText] = useState('') // Text in the input field
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all') // Filter state
  const [isLoaded, setIsLoaded] = useState(false) // Track if we've loaded from localStorage

  // ============================================
  // STEP 2: useEffect - Loading from localStorage
  // ============================================
  // This effect runs ONCE when the component first mounts (empty dependency array [])
  // It loads saved todos from the browser's localStorage
  
  useEffect(() => {
    // Try to get todos from localStorage
    const savedTodos = localStorage.getItem('todos')
    
    if (savedTodos) {

      // If we found saved todos, parse the JSON string back to an array
      try {

        // text to json object -> json.parse()
        // json to text -> json.stringify()
        const parsedTodos = JSON.parse(savedTodos)
        setTodos(parsedTodos) // Update state with saved todos
        setIsLoaded(true) // Mark as loaded
        console.log('✅ Loaded todos from localStorage:', parsedTodos)
      } catch (error) {
        console.error('❌ Error loading todos:', error)
        setIsLoaded(true) // Mark as loaded even on error
      }
    } else {
      console.log('📝 No saved todos found, starting fresh!')
      setIsLoaded(true) // Mark as loaded
    }
  }, []) // Empty array [] means: "Run this effect ONLY ONCE when component mounts"

  // ============================================
  // STEP 3: useEffect - Saving to localStorage
  // ============================================
  // This effect runs EVERY TIME the todos array changes
  // It saves the current todos to localStorage so they persist after page refresh
  
  useEffect(() => {
    // Only save if we've already loaded from localStorage (prevents saving empty array on initial mount)
    if (isLoaded) {
      // Convert todos array to JSON string and save to localStorage
      localStorage.setItem('todos', JSON.stringify(todos))
      console.log('💾 Saved todos to localStorage:', todos)
    }
  }, [todos, isLoaded]) // Runs when todos changes, but only if we've loaded

  // ============================================
  // Functions to Add, Toggle, and Delete Todos
  // ============================================
  
  // Format date nicely
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${day}/${month}/${year}, ${hours}:${minutes}`
  }

  // Add a new todo
  const addTodo = () => {
    if (inputText.trim() === '') return // Don't add empty todos
    
    // Create a new todo object
    const newTodo: Todo = {
      id: Date.now(), // Use timestamp as unique ID
      text: inputText.trim(),
      completed: false,
      createdAt: formatDate(new Date())
    }
    
    // Update state by creating a NEW array (immutability!)
    // We use the spread operator (...) to copy existing todos and add the new one
    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
    
    // Clear the input field
    setInputText('')
    
    console.log('➕ Added new todo:', newTodo)
    console.log('📋 Current todos:', updatedTodos)
  }

  // Toggle todo completion status
  const toggleTodo = (id: number) => {
    // Map through todos and update the one that matches the id
    // We create a NEW array with updated todo (immutability!)
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed } // Toggle completed status
        : todo // Keep other todos unchanged
    ))
  }

  // Delete a todo
  const deleteTodo = (id: number) => {
    // Filter out the todo with matching id
    // This creates a NEW array without that todo (immutability!)
    setTodos(todos.filter(todo => todo.id !== id))
    console.log('🗑️ Deleted todo with id:', id)
  }

  // Clear all completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  // ============================================
  // Filter todos based on current filter
  // ============================================
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true // 'all' shows everything
  })

  // Count statistics
  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📝 Todo Application
          </h1>
          <p className="text-lg text-gray-600">
            Built with useState & useEffect + LocalStorage
          </p>
        </div>

        {/* Todo App UI - Main Focus */}
        <div className="bg-white rounded-xl shadow-2xl p-6 mb-6">
          {/* Input Section */}
          <div className="mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="What needs to be done?"
                className="flex-1 border-2 border-gray-300 rounded-lg px-5 py-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition shadow-sm"
              />
              <button
                onClick={addTodo}
                disabled={!inputText.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                Add
              </button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition font-medium ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All ({todos.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg transition font-medium ${
                filter === 'active'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg transition font-medium ${
                filter === 'completed'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Completed ({completedCount})
            </button>
            {completedCount > 0 && (
              <button
                onClick={clearCompleted}
                className="ml-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium shadow-md"
              >
                Clear Completed
              </button>
            )}
          </div>

          {/* Todo List */}
          <div className="space-y-2 mb-6 min-h-[200px]">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-2xl mb-2">📭</p>
                <p className="text-lg font-medium">
                  {filter === 'all' 
                    ? 'No todos yet. Add one above! ✨' 
                    : filter === 'active'
                    ? 'All todos are completed! 🎉'
                    : 'No completed todos yet'}
                </p>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    todo.completed
                      ? 'bg-green-50 border-green-300'
                      : 'bg-gray-50 border-gray-200 hover:border-blue-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 cursor-pointer accent-blue-600"
                  />
                  <span
                    className={`flex-1 text-base ${
                      todo.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-900 font-medium'
                    }`}
                  >
                    {todo.text}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">{todo.createdAt}</span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm font-medium shadow-sm"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Statistics */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span className="font-medium">Total: <span className="text-blue-600 font-bold">{todos.length}</span></span>
              <span className="font-medium">Active: <span className="text-orange-600 font-bold">{activeCount}</span></span>
              <span className="font-medium">Completed: <span className="text-green-600 font-bold">{completedCount}</span></span>
            </div>
          </div>
        </div>

        {/* Educational Section - Collapsible */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-3">
              🎓 How This Todo App Works
            </h2>
            <p className="text-gray-700 mb-4">
              This application demonstrates how to use <strong>useState</strong> and <strong>useEffect</strong> 
              together with <strong>localStorage</strong> to create a persistent todo list.
            </p>
            
            <div className="space-y-4 mt-4">
              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold text-green-700 mb-2">✅ useState - Managing State</h3>
                <p className="text-sm text-gray-700 mb-2">
                  We use <code className="bg-gray-100 px-2 py-1 rounded">useState</code> to store:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  <li><code className="bg-gray-100 px-1 rounded">todos</code> - Array of all todo items</li>
                  <li><code className="bg-gray-100 px-1 rounded">inputText</code> - Current text in the input field</li>
                  <li><code className="bg-gray-100 px-1 rounded">filter</code> - Current filter (all/active/completed)</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  💡 When state changes, React automatically re-renders the component!
                </p>
              </div>

              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold text-purple-700 mb-2">🔄 useEffect - Side Effects</h3>
                <p className="text-sm text-gray-700 mb-2">
                  We use <code className="bg-gray-100 px-2 py-1 rounded">useEffect</code> for two things:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  <li><strong>Loading:</strong> Read todos from localStorage when component mounts (runs once)</li>
                  <li><strong>Saving:</strong> Save todos to localStorage whenever todos change (runs on every todos update)</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  💡 localStorage persists data even after closing the browser!
                </p>
              </div>

              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold text-orange-700 mb-2">💾 localStorage - Browser Storage</h3>
                <p className="text-sm text-gray-700 mb-2">
                  localStorage is a browser API that stores data as key-value pairs:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  <li><code className="bg-gray-100 px-1 rounded">localStorage.setItem(key, value)</code> - Save data</li>
                  <li><code className="bg-gray-100 px-1 rounded">localStorage.getItem(key)</code> - Read data</li>
                  <li>Data is stored as strings, so we use <code className="bg-gray-100 px-1 rounded">JSON.stringify/parse</code></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
            <h3 className="font-semibold text-yellow-900 mb-3">📚 Key Code Patterns</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">1. Loading from localStorage (runs once):</p>
                <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`useEffect(() => {
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    setTodos(JSON.parse(savedTodos))
  }
}, []) // Empty array = run once on mount`}
                </pre>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">2. Saving to localStorage (runs when todos change):</p>
                <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos))
}, [todos]) // Runs whenever todos changes`}
                </pre>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">3. Adding a new todo (immutability!):</p>
                <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`const addTodo = () => {
  const newTodo = { id: Date.now(), text: inputText, completed: false }
  setTodos([...todos, newTodo]) // Create NEW array
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Todo App UI */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Input Section */}
          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="What needs to be done?"
                className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-blue-500 focus:outline-none transition"
              />
              <button
                onClick={addTodo}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
              >
                Add Todo
              </button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All ({todos.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'active'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Completed ({completedCount})
            </button>
            {completedCount > 0 && (
              <button
                onClick={clearCompleted}
                className="ml-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Clear Completed
              </button>
            )}
          </div>

          {/* Todo List */}
          <div className="space-y-3 mb-6">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-xl mb-2">📭 No todos found</p>
                <p className="text-sm">
                  {filter === 'all' 
                    ? 'Add your first todo above!' 
                    : filter === 'active'
                    ? 'All todos are completed! 🎉'
                    : 'No completed todos yet'}
                </p>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 transition ${
                    todo.completed
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span
                    className={`flex-1 text-lg ${
                      todo.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-900'
                    }`}
                  >
                    {todo.text}
                  </span>
                  <span className="text-xs text-gray-400">{todo.createdAt}</span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Statistics */}
          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Total: {todos.length} todos</span>
              <span>Active: {activeCount}</span>
              <span>Completed: {completedCount}</span>
            </div>
          </div>
        </div>

        {/* Learning Tips */}
        <div className="mt-6 bg-white rounded-lg shadow-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Learning Tips</h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-2xl">1️⃣</span>
              <div>
                <p className="font-semibold">Try refreshing the page!</p>
                <p className="text-sm text-gray-600">
                  Your todos are saved in localStorage, so they'll still be there after refresh.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">2️⃣</span>
              <div>
                <p className="font-semibold">Open the browser console (F12)</p>
                <p className="text-sm text-gray-600">
                  You'll see console.log messages showing when todos are loaded and saved.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">3️⃣</span>
              <div>
                <p className="font-semibold">Notice the two useEffect hooks</p>
                <p className="text-sm text-gray-600">
                  One runs once (loading), the other runs every time todos change (saving).
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">4️⃣</span>
              <div>
                <p className="font-semibold">Remember immutability!</p>
                <p className="text-sm text-gray-600">
                  We always create new arrays/objects instead of modifying existing ones.
                  This is why we use <code className="bg-gray-100 px-1 rounded">[...todos, newTodo]</code> instead of <code className="bg-gray-100 px-1 rounded">todos.push(newTodo)</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
