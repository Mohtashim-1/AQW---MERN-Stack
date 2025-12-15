'use client'

import Link from 'next/link'
import Navigation from '../components/Navigation'

export default function ExercisesPage() {
  const exercises = [
    {
      id: 1,
      chapter: 'useState',
      difficulty: 'Easy',
      title: 'Counter with Step',
      description: 'Create a counter component that can increment/decrement by a custom step value.',
      requirements: [
        'Use useState to manage count and step values',
        'Add input field to change step value',
        'Add increment and decrement buttons',
        'Add reset button'
      ],
      hints: [
        'You\'ll need two useState hooks - one for count, one for step',
        'Use Number() to convert input value to number',
        'Remember to handle edge cases (negative steps, etc.)'
      ]
    },
    {
      id: 2,
      chapter: 'useState',
      difficulty: 'Easy',
      title: 'Todo List',
      description: 'Build a simple todo list where users can add and remove items.',
      requirements: [
        'Use useState with an array to store todos',
        'Add input field and button to add new todos',
        'Display list of todos',
        'Add delete button for each todo'
      ],
      hints: [
        'Store todos as an array of strings or objects',
        'Use filter() to remove items from array',
        'Use map() to render the list'
      ]
    },
    {
      id: 3,
      chapter: 'useEffect',
      difficulty: 'Medium',
      title: 'Timer Component',
      description: 'Create a timer that counts up from 0, with start/pause/reset functionality.',
      requirements: [
        'Use useState for timer value and running state',
        'Use useEffect with setInterval',
        'Clean up interval on unmount',
        'Add start, pause, and reset buttons'
      ],
      hints: [
        'Use setInterval inside useEffect',
        'Return cleanup function to clear interval',
        'Dependency array should include running state'
      ]
    },
    {
      id: 4,
      chapter: 'useEffect',
      difficulty: 'Medium',
      title: 'Fetch User Data',
      description: 'Create a component that fetches and displays user data from an API.',
      requirements: [
        'Use useState for loading, data, and error states',
        'Use useEffect to fetch data on mount',
        'Display loading state while fetching',
        'Handle errors gracefully'
      ],
      hints: [
        'Use async function inside useEffect',
        'Try fetching from: https://jsonplaceholder.typicode.com/users/1',
        'Set loading to false after fetch completes'
      ]
    },
    {
      id: 5,
      chapter: 'useContext',
      difficulty: 'Medium',
      title: 'Theme Context',
      description: 'Create a theme context that can be used across multiple components.',
      requirements: [
        'Create ThemeContext with createContext',
        'Create ThemeProvider component',
        'Use useContext in child component',
        'Toggle between light and dark themes'
      ],
      hints: [
        'Context value should include theme and toggleTheme function',
        'Wrap app in ThemeProvider',
        'Use useContext to access theme in components'
      ]
    },
    {
      id: 6,
      chapter: 'useMemo',
      difficulty: 'Medium',
      title: 'Expensive Calculation',
      description: 'Create a component that performs an expensive calculation (like factorial) and memoizes it.',
      requirements: [
        'Use useState for input number',
        'Use useMemo to calculate factorial',
        'Only recalculate when input changes',
        'Display calculation result'
      ],
      hints: [
        'Factorial: n! = n * (n-1) * (n-2) * ... * 1',
        'Use useMemo with input as dependency',
        'Add console.log to verify memoization works'
      ]
    },
    {
      id: 7,
      chapter: 'useCallback',
      difficulty: 'Hard',
      title: 'Optimized List',
      description: 'Create a list component with memoized child items that only re-render when needed.',
      requirements: [
        'Create parent component with list of items',
        'Create memoized child component',
        'Use useCallback for handlers',
        'Verify child only re-renders when its data changes'
      ],
      hints: [
        'Wrap child component with React.memo',
        'Use useCallback for click handlers',
        'Check console.log to verify re-renders'
      ]
    },
    {
      id: 8,
      chapter: 'useRef',
      difficulty: 'Medium',
      title: 'Focus Management',
      description: 'Create a form with multiple inputs that can be focused programmatically.',
      requirements: [
        'Create form with 3 input fields',
        'Use useRef for each input',
        'Add buttons to focus each input',
        'Add "Focus Next" button that cycles through inputs'
      ],
      hints: [
        'Create array of refs or individual refs',
        'Use ref.current?.focus() to focus',
        'Track current focused index with useState'
      ]
    },
    {
      id: 9,
      chapter: 'useReducer',
      difficulty: 'Hard',
      title: 'Shopping Cart',
      description: 'Build a shopping cart using useReducer to manage items, quantities, and total.',
      requirements: [
        'Use useReducer for cart state',
        'Actions: addItem, removeItem, updateQuantity, clearCart',
        'Calculate total price',
        'Display cart items and total'
      ],
      hints: [
        'State should include items array',
        'Each item: { id, name, price, quantity }',
        'Reducer handles all cart operations',
        'Total = sum of (price * quantity) for all items'
      ]
    },
    {
      id: 10,
      chapter: 'Custom Hooks',
      difficulty: 'Hard',
      title: 'useLocalStorage Hook',
      description: 'Create a custom hook that syncs state with localStorage.',
      requirements: [
        'Create useLocalStorage hook',
        'Hook should accept key and initial value',
        'Sync state with localStorage on changes',
        'Load from localStorage on mount'
      ],
      hints: [
        'Use useState with initial value from localStorage',
        'Use useEffect to save to localStorage',
        'Handle JSON.stringify/parse for objects',
        'Handle window undefined (SSR)'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto max-w-6xl p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📝 Practice Exercises</h1>
          <p className="text-lg text-gray-700 mb-6">
            Test your knowledge with hands-on exercises. Each exercise is designed to reinforce 
            the concepts you've learned. Try to solve them on your own before checking the solutions!
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="font-semibold text-blue-900 mb-2">💡 How to Approach Exercises:</p>
            <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
              <li>Read the requirements carefully</li>
              <li>Plan your solution before coding</li>
              <li>Start with basic functionality, then add features</li>
              <li>Test your solution thoroughly</li>
              <li>Check the solutions page if you get stuck</li>
            </ol>
          </div>
        </div>

        <div className="space-y-6">
          {exercises.map((exercise) => {
            const difficultyColors = {
              Easy: 'bg-green-100 text-green-800 border-green-300',
              Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
              Hard: 'bg-red-100 text-red-800 border-red-300'
            }

            return (
              <div key={exercise.id} className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">Exercise {exercise.id}: {exercise.title}</h2>
                      <span className={`px-3 py-1 rounded text-sm font-semibold border ${difficultyColors[exercise.difficulty as keyof typeof difficultyColors]}`}>
                        {exercise.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Chapter: {exercise.chapter}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{exercise.description}</p>

                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Requirements:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    {exercise.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">💡 Hints:</h3>
                  <ul className="list-disc list-inside space-y-1 text-yellow-800 text-sm">
                    {exercise.hints.map((hint, idx) => (
                      <li key={idx}>{hint}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/hooks-examples/solutions#exercise-${exercise.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    View Solution →
                  </Link>
                  <button
                    onClick={() => {
                      const code = `// Exercise ${exercise.id}: ${exercise.title}\n// Create your solution here\n\n'use client'\n\nimport { useState } from 'react'\n\nexport default function Exercise${exercise.id}() {\n  // Your code here\n  return (\n    <div>\n      {/* Your component JSX */}\n    </div>\n  )\n}`
                      navigator.clipboard.writeText(code)
                      alert('Starter code copied to clipboard!')
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                  >
                    Copy Starter Code
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">🎯 Ready to Check Your Answers?</h2>
          <p className="text-gray-700 mb-4">
            Once you've attempted the exercises, check the solutions page to see detailed explanations 
            and learn best practices.
          </p>
          <Link
            href="/hooks-examples/solutions"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            View All Solutions →
          </Link>
        </div>
      </div>
    </div>
  )
}

