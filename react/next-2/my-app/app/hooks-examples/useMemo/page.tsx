'use client'

import { useState, useMemo } from 'react'
import ChapterLayout from '../components/ChapterLayout'

export default function UseMemoPage() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState<string[]>([])

  const expensiveValue = useMemo(() => {
    console.log('💻 Computing...')
    let result = 0
    for (let i = 0; i < count * 1000000; i++) result += i
    return result
  }, [count])

  return (
    <ChapterLayout 
      title="useMemo Hook - Performance Optimization"
      chapterNumber={4}
      description="Optimize performance by memoizing expensive calculations"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 bg-orange-50 border-l-4 border-orange-500 p-6 rounded">
          <h2 className="text-2xl font-bold text-orange-900 mb-3">What is useMemo?</h2>
          <p className="text-gray-700">useMemo caches expensive calculations and only recalculates when dependencies change.</p>
        </div>
        <div className="border-2 border-orange-300 rounded-lg p-6 bg-orange-50">
          <p className="text-lg mb-3">Count: <span className="font-bold">{count}</span></p>
          <p className="text-sm mb-3">Expensive Value: {expensiveValue.toLocaleString()}</p>
          <button onClick={() => setCount(count + 1)} className="px-4 py-2 bg-blue-500 text-white rounded">
            Increment
          </button>
          <p className="text-xs text-gray-500 mt-2">Check console - calculation only runs when count changes</p>
        </div>
      </div>
    </ChapterLayout>
  )
}

