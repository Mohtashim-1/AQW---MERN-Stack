'use client'
// NEXT.JS TOPIC 3: CLIENT COMPONENTS
// The 'use client' directive makes this a Client Component
// Client Components can use React hooks, event handlers, and browser APIs

import { useState } from 'react'

const ClientCounter = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <p className="mb-4">
        This is a <strong>Client Component</strong> (notice the <code className="bg-blue-100 px-1 rounded">'use client'</code> directive).
        It can use React hooks and handle user interactions.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>
        <span className="text-2xl font-bold">{count}</span>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-4">
        Client Components are needed for: useState, useEffect, onClick handlers, browser APIs
      </p>
    </div>
  )
}

export default ClientCounter

