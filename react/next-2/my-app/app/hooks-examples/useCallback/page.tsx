'use client'

import { useState, useCallback } from 'react'
import React from 'react'
import ChapterLayout from '../components/ChapterLayout'

const ChildComponent = React.memo(({ onClick, label }: { onClick: () => void; label: string }) => {
  console.log(`🔄 Rendering ${label}`)
  return <button onClick={onClick} className="px-4 py-2 bg-indigo-500 text-white rounded">{label}</button>
})

export default function UseCallbackPage() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  const handleClickWithCallback = useCallback(() => {
    console.log('Clicked!')
  }, [])

  const handleClickWithoutCallback = () => {
    console.log('Clicked!')
  }

  return (
    <ChapterLayout 
      title="useCallback Hook - Memoizing Functions"
      chapterNumber={5}
      description="Memoize functions to prevent unnecessary re-renders"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded">
          <h2 className="text-2xl font-bold text-indigo-900 mb-3">What is useCallback?</h2>
          <p className="text-gray-700">useCallback memoizes functions so the same reference is returned unless dependencies change.</p>
        </div>
        <div className="border-2 border-indigo-300 rounded-lg p-6 bg-indigo-50">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Type something..." className="border p-2 rounded mb-3" />
          <div className="space-x-2">
            <ChildComponent onClick={handleClickWithCallback} label="With useCallback ✅" />
            <ChildComponent onClick={handleClickWithoutCallback} label="Without useCallback ❌" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Check console - only one re-renders when typing</p>
        </div>
      </div>
    </ChapterLayout>
  )
}

