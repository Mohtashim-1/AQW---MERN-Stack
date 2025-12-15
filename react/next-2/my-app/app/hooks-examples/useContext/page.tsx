'use client'

import React, { useState, useContext } from 'react'
import ChapterLayout from '../components/ChapterLayout'

interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

const UseContextExample = () => {
  const context = useContext(ThemeContext)
  if (!context) return null
  const { theme, toggleTheme } = context

  return (
    <div className={`p-4 rounded border-2 ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}>
      <p className="text-lg mb-2">Current Theme: <span className="font-bold">{theme === 'dark' ? '🌙 Dark' : '☀️ Light'}</span></p>
      <button onClick={toggleTheme} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
        Toggle Theme
      </button>
    </div>
  )
}

export default function UseContextPage() {
  return (
    <ChapterLayout 
      title="useContext Hook - Global State Without Prop Drilling"
      chapterNumber={3}
      description="Share state globally without prop drilling"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded mb-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-3">What is useContext?</h2>
            <p className="text-gray-700 mb-3">
              useContext allows you to access data from React Context without prop drilling.
              Context is like a "global state" that can be accessed by any component in the tree.
            </p>
            <div className="bg-white p-4 rounded mt-4">
              <p className="font-semibold mb-2">How it works:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                <li>Create a Context: <code className="bg-gray-100 px-1 rounded">createContext()</code></li>
                <li>Wrap components in Provider: <code className="bg-gray-100 px-1 rounded">&lt;Context.Provider&gt;</code></li>
                <li>Use the hook: <code className="bg-gray-100 px-1 rounded">useContext(Context)</code></li>
              </ol>
            </div>
          </div>
        </div>

        <div className="border-2 border-purple-300 rounded-lg p-6 bg-purple-50 mb-6">
          <h3 className="text-xl font-bold text-purple-900 mb-3">Example: Theme Switcher</h3>
          <ThemeProvider>
            <UseContextExample />
          </ThemeProvider>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-900 mb-2">💡 When to Use:</h3>
          <ul className="list-disc list-inside space-y-1 text-yellow-800">
            <li>Theme preferences (light/dark mode)</li>
            <li>User authentication data</li>
            <li>Language/locale settings</li>
            <li>Any data needed by many components</li>
          </ul>
        </div>
      </div>
    </ChapterLayout>
  )
}

