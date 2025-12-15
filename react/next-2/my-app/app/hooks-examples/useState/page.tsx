'use client'

import { useState } from 'react'
import ChapterLayout from '../components/ChapterLayout'

export default function UseStatePage() {
  // Example 1: Simple Counter
  const [count, setCount] = useState(0)

  // Example 2: Text Input
  const [name, setName] = useState('')

  // Example 3: Boolean Toggle
  const [isVisible, setIsVisible] = useState(true)

  // Example 4: Object State
  const [user, setUser] = useState({ name: '', age: 0 })

  return (
    <ChapterLayout 
      title="useState Hook - Managing Component State"
      chapterNumber={1}
      description="Learn how to manage component state - the foundation of React interactivity"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Introduction */}
        <div className="mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-3">What is useState?</h2>
            <p className="text-gray-700 mb-3">
              <strong>useState</strong> is the most fundamental React Hook. It allows functional components 
              to have "state" - data that can change over time and causes the component to re-render when updated.
            </p>
            <p className="text-gray-700 mb-3">
              In React, when data changes, we want the UI to update automatically. useState gives us a way 
              to store data that, when changed, tells React "Hey, something changed! Please update the screen!"
            </p>
            <div className="bg-white p-4 rounded mt-4">
              <p className="font-semibold mb-2">Syntax:</p>
              <code className="text-sm bg-gray-100 p-2 rounded block">
                const [value, setValue] = useState(initialValue)
              </code>
              <ul className="mt-3 space-y-1 text-sm text-gray-700">
                <li><strong>value:</strong> The current state value</li>
                <li><strong>setValue:</strong> Function to update the state</li>
                <li><strong>initialValue:</strong> Starting value (only used on first render)</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
            <h3 className="font-semibold text-yellow-900 mb-2">📚 Learning Objectives:</h3>
            <ul className="list-disc list-inside space-y-1 text-yellow-800">
              <li>Understand what state is and why we need it</li>
              <li>Learn how to declare and update state</li>
              <li>Practice with different data types (number, string, boolean, object)</li>
              <li>Understand that state changes trigger re-renders</li>
              <li>Learn about state immutability</li>
            </ul>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-6">
          {/* Example 1: Counter */}
          <div className="border-2 border-blue-300 rounded-lg p-6 bg-blue-50">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Example 1: Counter</h3>
            <p className="text-gray-700 mb-4">
              This is the "Hello World" of React state. We store a number and update it. 
              Notice how the UI updates automatically when you click the buttons!
            </p>
            <div className="bg-white p-4 rounded border mb-4">
              <div className="flex items-center gap-4 mb-4">
                <p className="text-lg font-mono">Count: <span className="font-bold text-blue-600 text-2xl">{count}</span></p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button 
                  onClick={() => setCount(count + 1)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Increment (+1)
                </button>
                <button 
                  onClick={() => setCount(count - 1)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Decrement (-1)
                </button>
                <button 
                  onClick={() => setCount(0)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold mb-2 text-sm">Code:</p>
              <pre className="text-xs overflow-x-auto">
{`const [count, setCount] = useState(0)

// Update state
<button onClick={() => setCount(count + 1)}>
  Increment
</button>`}
              </pre>
            </div>
          </div>

          {/* Example 2: Text Input */}
          <div className="border-2 border-green-300 rounded-lg p-6 bg-green-50">
            <h3 className="text-xl font-bold text-green-900 mb-3">Example 2: Controlled Input</h3>
            <p className="text-gray-700 mb-4">
              When you type, the state updates, and React re-renders to show the new value.
              This is called a "controlled component" - React controls the input value.
            </p>
            <div className="bg-white p-4 rounded border mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type your name here..."
                className="border-2 border-gray-300 p-3 rounded w-full mb-3 focus:border-green-500 focus:outline-none"
              />
              <p className="text-lg">
                Hello, <span className="font-bold text-green-600">{name || 'Guest'}</span>! 👋
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold mb-2 text-sm">Code:</p>
              <pre className="text-xs overflow-x-auto">
{`const [name, setName] = useState('')

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`}
              </pre>
            </div>
          </div>

          {/* Example 3: Toggle */}
          <div className="border-2 border-purple-300 rounded-lg p-6 bg-purple-50">
            <h3 className="text-xl font-bold text-purple-900 mb-3">Example 3: Toggle Visibility</h3>
            <p className="text-gray-700 mb-4">
              Booleans are perfect for on/off states like showing/hiding content, 
              enabling/disabling features, or toggling between two states.
            </p>
            <div className="bg-white p-4 rounded border mb-4">
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition mb-3"
              >
                {isVisible ? '👁️ Hide' : '🙈 Show'} Message
              </button>
              {isVisible && (
                <div className="p-4 bg-purple-100 border border-purple-300 rounded">
                  <p className="text-purple-800">✨ This message is visible!</p>
                </div>
              )}
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold mb-2 text-sm">Code:</p>
              <pre className="text-xs overflow-x-auto">
{`const [isVisible, setIsVisible] = useState(true)

<button onClick={() => setIsVisible(!isVisible)}>
  {isVisible ? 'Hide' : 'Show'}
</button>
{isVisible && <div>Content</div>}`}
              </pre>
            </div>
          </div>

          {/* Example 4: Object State */}
          <div className="border-2 border-orange-300 rounded-lg p-6 bg-orange-50">
            <h3 className="text-xl font-bold text-orange-900 mb-3">Example 4: Object State</h3>
            <p className="text-gray-700 mb-4">
              When updating objects, we must create a NEW object. React compares by reference,
              so modifying the old object won't trigger a re-render. This is called "immutability".
            </p>
            <div className="bg-white p-4 rounded border mb-4">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="border-2 border-gray-300 p-2 rounded w-full focus:border-orange-500 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={user.age || ''}
                  onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
                  className="border-2 border-gray-300 p-2 rounded w-full focus:border-orange-500 focus:outline-none"
                />
                <p className="text-lg">
                  User: <span className="font-bold">{user.name || 'Anonymous'}</span>, 
                  Age: <span className="font-bold">{user.age || 0}</span>
                </p>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold mb-2 text-sm">Code:</p>
              <pre className="text-xs overflow-x-auto">
{`const [user, setUser] = useState({ name: '', age: 0 })

// ✅ Correct - creates new object
setUser({ ...user, name: 'John' })

// ❌ Wrong - mutates existing object
user.name = 'John'`}
              </pre>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="mt-8 bg-gray-50 border-2 border-gray-300 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">🔑 Key Points to Remember</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              <span>State updates are <strong>asynchronous</strong> - React batches them for performance</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              <span>Always use the setter function - <strong>never modify state directly</strong></span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              <span>When state changes, React <strong>re-renders the component</strong></span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              <span>State is <strong>isolated</strong> to each component instance</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">5.</span>
              <span>For objects/arrays, always create <strong>new</strong> objects/arrays (immutability)</span>
            </li>
          </ul>
        </div>

        {/* Common Mistakes */}
        <div className="mt-6 bg-red-50 border-2 border-red-300 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-900 mb-4">⚠️ Common Mistakes</h3>
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-red-800 mb-1">❌ Mutating state directly:</p>
              <code className="text-xs bg-red-100 p-2 rounded block">count = count + 1</code>
              <p className="text-sm text-red-700 mt-1">✅ Correct: setCount(count + 1)</p>
            </div>
            <div>
              <p className="font-semibold text-red-800 mb-1">❌ Mutating objects:</p>
              <code className="text-xs bg-red-100 p-2 rounded block">user.name = 'John'</code>
              <p className="text-sm text-red-700 mt-1">✅ Correct: setUser({'{'} ...user, name: 'John' {'}'})</p>
            </div>
          </div>
        </div>
      </div>
    </ChapterLayout>
  )
}

