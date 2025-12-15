'use client'

import { useState, useCallback } from 'react'
import ChapterLayout from '../components/ChapterLayout'

const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState(initialValue)
  const increment = useCallback(() => setCount(prev => prev + 1), [])
  const decrement = useCallback(() => setCount(prev => prev - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  return { count, increment, decrement, reset }
}

export default function CustomHooksPage() {
  const counter1 = useCounter(0)
  const counter2 = useCounter(10)

  return (
    <ChapterLayout 
      title="Custom Hooks - Reusable Logic"
      chapterNumber={8}
      description="Create reusable logic with custom hooks"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded">
          <h2 className="text-2xl font-bold text-cyan-900 mb-3">What are Custom Hooks?</h2>
          <p className="text-gray-700">Custom hooks are functions starting with "use" that can call other hooks. They let you extract and reuse component logic.</p>
        </div>
        <div className="border-2 border-cyan-300 rounded-lg p-6 bg-cyan-50">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border p-3 rounded">
              <p className="font-semibold mb-2">Counter 1: {counter1.count}</p>
              <div className="space-x-2">
                <button onClick={counter1.increment} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">+</button>
                <button onClick={counter1.decrement} className="px-3 py-1 bg-red-500 text-white rounded text-sm">-</button>
                <button onClick={counter1.reset} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">Reset</button>
              </div>
            </div>
            <div className="border p-3 rounded">
              <p className="font-semibold mb-2">Counter 2: {counter2.count}</p>
              <div className="space-x-2">
                <button onClick={counter2.increment} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">+</button>
                <button onClick={counter2.decrement} className="px-3 py-1 bg-red-500 text-white rounded text-sm">-</button>
                <button onClick={counter2.reset} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChapterLayout>
  )
}

