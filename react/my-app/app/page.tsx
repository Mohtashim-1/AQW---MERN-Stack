'use client'
// REACT TOPIC 1: HOOKS (useState, useEffect)
import { useState, useEffect } from 'react'
import UserCard from './Component/UserCard'
import ToggleButton from './Component/ToggleButton'

interface User {
  id: number
  name: string
  email: string
}

const Page = () => {
  // useState Hook - Managing component state
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // useEffect Hook - Side effects (API calls, subscriptions, etc.)
  useEffect(() => {
    // Simulating API call
    const fetchUsers = async () => {
      setIsLoading(true)
      // Simulate delay
      setTimeout(() => {
        setUsers([
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
        ])
        setIsLoading(false)
      }, 1000)
    }
    fetchUsers()
  }, []) // Empty dependency array means this runs once on mount

  // REACT TOPIC 2: CONDITIONAL RENDERING
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">React & Next.js Examples</h1>
      
      {/* Example 1: useState Hook */}
      <section className="mb-8 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">React Topic 1: useState Hook</h2>
        <div className="space-y-4">
          <p className="text-lg">Count: <span className="font-bold text-blue-600">{count}</span></p>
          <div className="space-x-4">
            <button 
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Increment
            </button>
            <button 
              onClick={() => setCount(count - 1)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Decrement
            </button>
            <button 
              onClick={() => setCount(0)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Example 2: useEffect Hook */}
      <section className="mb-8 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">React Topic 2: useEffect Hook</h2>
        {isLoading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </section>

      {/* Example 3: Props and Conditional Rendering */}
      <section className="mb-8 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">React Topic 3: Props & Conditional Rendering</h2>
        <ToggleButton />
      </section>
    </div>
  )
}

export default Page