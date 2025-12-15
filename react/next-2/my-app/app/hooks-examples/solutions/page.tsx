'use client'

import React, { useState, useEffect, useContext, useMemo, useCallback, useRef, useReducer } from 'react'
import Navigation from '../components/Navigation'
import Link from 'next/link'

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto max-w-6xl p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">✅ Exercise Solutions</h1>
          <p className="text-lg text-gray-700 mb-6">
            Detailed solutions with explanations for all exercises. Study these solutions to understand 
            best practices and different approaches to solving problems.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold text-yellow-900 mb-2">⚠️ Important:</p>
            <p className="text-yellow-800 text-sm">
              Try solving exercises on your own first! These solutions are for learning and reference. 
              There are often multiple correct ways to solve a problem.
            </p>
          </div>
        </div>

        {/* Exercise 1 Solution */}
        <div id="exercise-1" className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Exercise 1: Counter with Step</h2>
          <Solution1 />
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Explanation:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Two useState hooks: one for count, one for step</li>
              <li>Step input uses Number() to convert string to number</li>
              <li>Increment/decrement use the step value</li>
              <li>Reset sets count back to 0</li>
            </ul>
          </div>
        </div>

        {/* Exercise 2 Solution */}
        <div id="exercise-2" className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Exercise 2: Todo List</h2>
          <Solution2 />
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Explanation:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>State is an array of todo objects with id and text</li>
              <li>Add todo: spread existing array and add new item</li>
              <li>Delete todo: filter out item with matching id</li>
              <li>Use map() to render list items</li>
            </ul>
          </div>
        </div>

        {/* Exercise 3 Solution */}
        <div id="exercise-3" className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Exercise 3: Timer Component</h2>
          <Solution3 />
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Explanation:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>useState for timer value and isRunning boolean</li>
              <li>useEffect runs setInterval when isRunning is true</li>
              <li>Cleanup function clears interval</li>
              <li>Dependency array includes isRunning</li>
            </ul>
          </div>
        </div>

        {/* Exercise 4 Solution */}
        <div id="exercise-4" className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Exercise 4: Fetch User Data</h2>
          <Solution4 />
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Explanation:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Three state variables: loading, data, error</li>
              <li>useEffect fetches on mount (empty dependency array)</li>
              <li>Async function inside useEffect</li>
              <li>Try-catch for error handling</li>
            </ul>
          </div>
        </div>

        {/* Exercise 5 Solution */}
        <div id="exercise-5" className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Exercise 5: Theme Context</h2>
          <Solution5 />
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Explanation:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>CreateContext for theme</li>
              <li>Provider component wraps children</li>
              <li>useContext in child to access theme</li>
              <li>Toggle function updates theme state</li>
            </ul>
          </div>
        </div>

        {/* Exercise 6 Solution */}
        <div id="exercise-6" className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Exercise 6: Expensive Calculation</h2>
          <Solution6 />
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Explanation:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>useMemo caches factorial calculation</li>
              <li>Only recalculates when number changes</li>
              <li>Check console to verify memoization</li>
              <li>Prevents unnecessary recalculations</li>
            </ul>
          </div>
        </div>

        {/* Exercise 7 Solution */}
        <div id="exercise-7" className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Exercise 7: Optimized List</h2>
          <Solution7 />
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Explanation:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>React.memo prevents unnecessary re-renders</li>
              <li>useCallback memoizes click handler</li>
              <li>Child only re-renders when its data changes</li>
              <li>Check console logs to verify</li>
            </ul>
          </div>
        </div>

        {/* Exercise 8 Solution */}
        <div id="exercise-8" className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Exercise 8: Focus Management</h2>
          <Solution8 />
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Explanation:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Array of refs for multiple inputs</li>
              <li>useRef for each input element</li>
              <li>Focus next cycles through refs</li>
              <li>ref.current?.focus() to focus element</li>
            </ul>
          </div>
        </div>

        {/* Exercise 9 Solution */}
        <div id="exercise-9" className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Exercise 9: Shopping Cart</h2>
          <Solution9 />
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Explanation:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>useReducer manages complex cart state</li>
              <li>Reducer handles all cart operations</li>
              <li>Actions: add, remove, update, clear</li>
              <li>Total calculated from items array</li>
            </ul>
          </div>
        </div>

        {/* Exercise 10 Solution */}
        <div id="exercise-10" className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Exercise 10: useLocalStorage Hook</h2>
          <Solution10 />
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Explanation:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Custom hook starting with "use"</li>
              <li>Loads from localStorage on mount</li>
              <li>Syncs to localStorage on changes</li>
              <li>Handles JSON and SSR edge cases</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 border-2 border-blue-300 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-3">🎉 Great Job!</h2>
          <p className="text-gray-700 mb-4">
            You've completed all the exercises! Keep practicing and building projects to reinforce your learning.
          </p>
          <Link
            href="/hooks-examples"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Back to Home →
          </Link>
        </div>
      </div>
    </div>
  )
}

// Solution Components
function Solution1() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)

  return (
    <div className="border-2 border-blue-300 rounded p-4 bg-blue-50">
      <div className="mb-4">
        <p className="text-lg font-mono mb-2">Count: <span className="font-bold text-blue-600">{count}</span></p>
        <label className="block mb-2">
          Step: <input type="number" value={step} onChange={(e) => setStep(Number(e.target.value))} className="border p-1 rounded ml-2" min="1" />
        </label>
      </div>
      <div className="space-x-2">
        <button onClick={() => setCount(count + step)} className="px-4 py-2 bg-blue-500 text-white rounded">+{step}</button>
        <button onClick={() => setCount(count - step)} className="px-4 py-2 bg-red-500 text-white rounded">-{step}</button>
        <button onClick={() => setCount(0)} className="px-4 py-2 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <pre className="mt-4 text-xs bg-white p-3 rounded overflow-x-auto">
{`const [count, setCount] = useState(0)
const [step, setStep] = useState(1)

<button onClick={() => setCount(count + step)}>+{step}</button>`}
      </pre>
    </div>
  )
}

function Solution2() {
  const [todos, setTodos] = useState<{ id: number; text: string }[]>([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }])
      setInput('')
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="border-2 border-green-300 rounded p-4 bg-green-50">
      <div className="mb-4">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTodo()} placeholder="Add todo..." className="border p-2 rounded mr-2" />
        <button onClick={addTodo} className="px-4 py-2 bg-green-500 text-white rounded">Add</button>
      </div>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex justify-between items-center bg-white p-2 rounded">
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} className="px-2 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
          </li>
        ))}
      </ul>
      <pre className="mt-4 text-xs bg-white p-3 rounded overflow-x-auto">
{`const [todos, setTodos] = useState([])

const addTodo = () => {
  setTodos([...todos, { id: Date.now(), text: input }])
}

const deleteTodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id))
}`}
      </pre>
    </div>
  )
}

function Solution3() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning])

  return (
    <div className="border-2 border-purple-300 rounded p-4 bg-purple-50">
      <p className="text-2xl font-bold mb-4">Timer: {seconds}s</p>
      <div className="space-x-2">
        <button onClick={() => setIsRunning(!isRunning)} className="px-4 py-2 bg-purple-500 text-white rounded">
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => { setSeconds(0); setIsRunning(false) }} className="px-4 py-2 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <pre className="mt-4 text-xs bg-white p-3 rounded overflow-x-auto">
{`useEffect(() => {
  if (!isRunning) return
  const interval = setInterval(() => {
    setSeconds(prev => prev + 1)
  }, 1000)
  return () => clearInterval(interval)
}, [isRunning])`}
      </pre>
    </div>
  )
}

function Solution4() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
        const json = await response.json()
        setData(json)
        setError(null)
      } catch (err) {
        setError('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="border-2 border-blue-300 rounded p-4 bg-blue-50">Loading...</div>
  if (error) return <div className="border-2 border-red-300 rounded p-4 bg-red-50">{error}</div>
  return (
    <div className="border-2 border-green-300 rounded p-4 bg-green-50">
      <p><strong>Name:</strong> {data?.name}</p>
      <p><strong>Email:</strong> {data?.email}</p>
    </div>
  )
}

function Solution5() {
  const ThemeContext = React.createContext<{ theme: string; toggleTheme: () => void } | undefined>(undefined)
  
  const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState('light')
    return <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(prev => prev === 'light' ? 'dark' : 'light') }}>{children}</ThemeContext.Provider>
  }

  const ThemedComponent = () => {
    const context = useContext(ThemeContext)
    if (!context) return null
    return (
      <div className={`p-4 rounded ${context.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <p>Current theme: {context.theme}</p>
        <button onClick={context.toggleTheme} className="px-4 py-2 bg-purple-500 text-white rounded mt-2">Toggle</button>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <ThemedComponent />
    </ThemeProvider>
  )
}

function Solution6() {
  const [number, setNumber] = useState(5)

  const factorial = useMemo(() => {
    console.log('Calculating factorial...')
    let result = 1
    for (let i = 1; i <= number; i++) {
      result *= i
    }
    return result
  }, [number])

  return (
    <div className="border-2 border-orange-300 rounded p-4 bg-orange-50">
      <input type="number" value={number} onChange={(e) => setNumber(Number(e.target.value))} className="border p-2 rounded mb-2" min="1" />
      <p className="text-lg">Factorial of {number} = {factorial}</p>
      <p className="text-xs text-gray-500">Check console - only logs when number changes</p>
    </div>
  )
}

function Solution7() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])
  const [count, setCount] = useState(0)

  const handleClick = useCallback((item: string) => {
    console.log(`Clicked: ${item}`)
  }, [])

  const MemoizedItem = React.memo(({ item, onClick }: { item: string; onClick: () => void }) => {
    console.log(`Rendering: ${item}`)
    return <button onClick={onClick} className="px-4 py-2 bg-indigo-500 text-white rounded mr-2">{item}</button>
  })

  return (
    <div className="border-2 border-indigo-300 rounded p-4 bg-indigo-50">
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} className="px-4 py-2 bg-blue-500 text-white rounded mb-2">Increment</button>
      <div>
        {items.map(item => <MemoizedItem key={item} item={item} onClick={() => handleClick(item)} />)}
      </div>
      <p className="text-xs text-gray-500 mt-2">Check console - items don't re-render when count changes</p>
    </div>
  )
}

function Solution8() {
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]
  const [currentIndex, setCurrentIndex] = useState(0)

  const focusNext = () => {
    const nextIndex = (currentIndex + 1) % inputRefs.length
    inputRefs[nextIndex].current?.focus()
    setCurrentIndex(nextIndex)
  }

  return (
    <div className="border-2 border-teal-300 rounded p-4 bg-teal-50">
      {inputRefs.map((ref, idx) => (
        <input key={idx} ref={ref} type="text" placeholder={`Input ${idx + 1}`} className="border p-2 rounded block mb-2 w-full" />
      ))}
      <div className="space-x-2">
        {inputRefs.map((ref, idx) => (
          <button key={idx} onClick={() => ref.current?.focus()} className="px-3 py-1 bg-teal-500 text-white rounded text-sm">Focus {idx + 1}</button>
        ))}
        <button onClick={focusNext} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Focus Next</button>
      </div>
    </div>
  )
}

function Solution9() {
  interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
  }

  type CartAction =
    | { type: 'add'; payload: Omit<CartItem, 'quantity'> }
    | { type: 'remove'; payload: number }
    | { type: 'updateQuantity'; payload: { id: number; quantity: number } }
    | { type: 'clear' }

  const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    switch (action.type) {
      case 'add':
        const existing = state.find(item => item.id === action.payload.id)
        if (existing) {
          return state.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item)
        }
        return [...state, { ...action.payload, quantity: 1 }]
      case 'remove':
        return state.filter(item => item.id !== action.payload)
      case 'updateQuantity':
        return state.map(item => item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item)
      case 'clear':
        return []
      default:
        return state
    }
  }

  const [cart, dispatch] = useReducer(cartReducer, [])
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="border-2 border-pink-300 rounded p-4 bg-pink-50">
      <div className="mb-4">
        <button onClick={() => dispatch({ type: 'add', payload: { id: 1, name: 'Apple', price: 1.5 } })} className="px-3 py-1 bg-green-500 text-white rounded text-sm mr-2">Add Apple</button>
        <button onClick={() => dispatch({ type: 'add', payload: { id: 2, name: 'Banana', price: 0.5 } })} className="px-3 py-1 bg-yellow-500 text-white rounded text-sm mr-2">Add Banana</button>
        <button onClick={() => dispatch({ type: 'clear' })} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Clear Cart</button>
      </div>
      <ul className="space-y-2 mb-4">
        {cart.map(item => (
          <li key={item.id} className="flex justify-between items-center bg-white p-2 rounded">
            <span>{item.name} - ${item.price} x {item.quantity}</span>
            <div>
              <button onClick={() => dispatch({ type: 'updateQuantity', payload: { id: item.id, quantity: item.quantity - 1 } })} className="px-2 py-1 bg-gray-300 rounded text-sm">-</button>
              <button onClick={() => dispatch({ type: 'remove', payload: item.id })} className="px-2 py-1 bg-red-500 text-white rounded text-sm mx-1">Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
    </div>
  )
}

function Solution10() {
  const useLocalStorage = <T,>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
      if (typeof window === 'undefined') return initialValue
      try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      } catch {
        return initialValue
      }
    })

    const setValue = (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    }

    return [storedValue, setValue] as const
  }

  const [name, setName] = useLocalStorage('userName', '')

  return (
    <div className="border-2 border-cyan-300 rounded p-4 bg-cyan-50">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name (saved to localStorage)" className="border p-2 rounded mb-2" />
      <p>Name: {name || 'Not set'}</p>
      <p className="text-xs text-gray-500">Refresh page - name persists!</p>
    </div>
  )
}

