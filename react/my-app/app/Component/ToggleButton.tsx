'use client'
// REACT TOPIC: CONDITIONAL RENDERING - Show/hide content based on state
import { useState } from 'react'

const ToggleButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [theme, setTheme] = useState('light')

  return (
    <div className="space-y-4">
      {/* Conditional Rendering Example 1: Show/Hide */}
      <div className="p-4 border rounded-lg">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
        >
          {isVisible ? 'Hide' : 'Show'} Message
        </button>
        {isVisible && (
          <div className="p-4 bg-green-100 border border-green-300 rounded">
            <p className="text-green-800">This message is conditionally rendered!</p>
          </div>
        )}
      </div>

      {/* Conditional Rendering Example 2: Ternary Operator */}
      <div className="p-4 border rounded-lg">
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mb-4"
        >
          Toggle Theme
        </button>
        <div className={`p-4 rounded ${theme === 'light' ? 'bg-yellow-100 text-yellow-900' : 'bg-gray-800 text-white'}`}>
          <p>Current theme: <strong>{theme}</strong></p>
          <p className="mt-2">
            {theme === 'light' 
              ? '☀️ Light mode is active!' 
              : '🌙 Dark mode is active!'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ToggleButton

