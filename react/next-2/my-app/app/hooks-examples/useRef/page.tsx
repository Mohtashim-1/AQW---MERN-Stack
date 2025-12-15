'use client'

import { useState, useRef, useEffect } from 'react'
import ChapterLayout from '../components/ChapterLayout'

export default function UseRefPage() {
  const [count, setCount] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const renderCountRef = useRef(0)
  const previousCountRef = useRef(0)

  renderCountRef.current += 1

  useEffect(() => {
    previousCountRef.current = count
  }, [count])

  return (
    <ChapterLayout 
      title="useRef Hook - DOM Access & Mutable Values"
      chapterNumber={6}
      description="Access DOM elements and store mutable values without re-renders"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 bg-teal-50 border-l-4 border-teal-500 p-6 rounded">
          <h2 className="text-2xl font-bold text-teal-900 mb-3">What is useRef?</h2>
          <p className="text-gray-700">useRef returns a mutable object that persists across renders without causing re-renders.</p>
        </div>
        <div className="space-y-4">
          <div className="border-2 border-teal-300 rounded-lg p-6 bg-teal-50">
            <h3 className="font-bold mb-2">DOM Access</h3>
            <input ref={inputRef} type="text" placeholder="Click button to focus" className="border p-2 rounded mr-2" />
            <button onClick={() => inputRef.current?.focus()} className="px-4 py-2 bg-teal-500 text-white rounded">
              Focus Input
            </button>
          </div>
          <div className="border-2 border-teal-300 rounded-lg p-6 bg-teal-50">
            <h3 className="font-bold mb-2">Tracking Values</h3>
            <p>Count: {count}</p>
            <p>Previous: {previousCountRef.current}</p>
            <p>Renders: {renderCountRef.current}</p>
            <button onClick={() => setCount(count + 1)} className="px-4 py-2 bg-blue-500 text-white rounded">
              Increment
            </button>
          </div>
        </div>
      </div>
    </ChapterLayout>
  )
}

