'use client'

import Link from 'next/link'
import Navigation from './components/Navigation'

export default function HooksExamplesIndex() {
  const chapters = [
    {
      number: 1,
      title: 'useState Hook',
      path: '/hooks-examples/useState',
      description: 'Learn how to manage component state - the foundation of React interactivity',
      color: 'blue',
      topics: ['State basics', 'Updating state', 'Different data types', 'State immutability']
    },
    {
      number: 2,
      title: 'useEffect Hook',
      path: '/hooks-examples/useEffect',
      description: 'Master side effects, lifecycle methods, and data fetching',
      color: 'green',
      topics: ['Side effects', 'Dependency arrays', 'Cleanup functions', 'API calls']
    },
    {
      number: 3,
      title: 'useContext Hook',
      path: '/hooks-examples/useContext',
      description: 'Share state globally without prop drilling',
      color: 'purple',
      topics: ['Context API', 'Providers', 'Global state', 'Avoiding prop drilling']
    },
    {
      number: 4,
      title: 'useMemo Hook',
      path: '/hooks-examples/useMemo',
      description: 'Optimize performance by memoizing expensive calculations',
      color: 'orange',
      topics: ['Performance optimization', 'Memoization', 'Expensive calculations', 'Dependency arrays']
    },
    {
      number: 5,
      title: 'useCallback Hook',
      path: '/hooks-examples/useCallback',
      description: 'Memoize functions to prevent unnecessary re-renders',
      color: 'indigo',
      topics: ['Function memoization', 'React.memo', 'Preventing re-renders', 'Performance']
    },
    {
      number: 6,
      title: 'useRef Hook',
      path: '/hooks-examples/useRef',
      description: 'Access DOM elements and store mutable values without re-renders',
      color: 'teal',
      topics: ['DOM access', 'Mutable values', 'Previous values', 'Refs vs state']
    },
    {
      number: 7,
      title: 'useReducer Hook',
      path: '/hooks-examples/useReducer',
      description: 'Manage complex state with the reducer pattern',
      color: 'pink',
      topics: ['Complex state', 'Reducer pattern', 'Actions', 'State transitions']
    },
    {
      number: 8,
      title: 'Custom Hooks',
      path: '/hooks-examples/custom-hooks',
      description: 'Create reusable logic with custom hooks',
      color: 'cyan',
      topics: ['Reusable logic', 'Hook composition', 'Best practices', 'Real-world examples']
    },
    {
      number: 9,
      title: 'Next.js Concepts',
      path: '/hooks-examples/nextjs-concepts',
      description: 'Understand Next.js specific features and patterns',
      color: 'violet',
      topics: ['Server Components', 'Client Components', 'File-based routing', 'Data fetching']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />
      <div className="container mx-auto max-w-6xl p-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {/* <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Complete React & Next.js Learning Guide
          </h1> */}
          {/* <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
            A comprehensive, step-by-step guide designed for students. Learn React Hooks and Next.js 
            through interactive examples, clear explanations, and hands-on practice.
          </p> */}
          <div className="flex justify-center gap-4">
            <Link 
              href="/hooks-examples/exercises"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Start Exercises
            </Link>
            <Link 
              href="/hooks-examples/useState"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Start Learning
            </Link>
          </div>
        </div>

        {/* How to Use This Guide */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use This Guide</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">For Students:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Read each chapter from start to finish</li>
                <li>Try all the interactive examples</li>
                <li>Read code comments and explanations</li>
                <li>Experiment by modifying the code</li>
                <li>Complete the exercises at the end</li>
                <li>Check solutions to verify your understanding</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">For Teachers:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Use chapters as lesson plans</li>
                <li>Each chapter builds on previous concepts</li>
                <li>Interactive examples for demonstrations</li>
                <li>Exercises for homework assignments</li>
                <li>Solutions included for grading reference</li>
                <li>Progressive difficulty for scaffolding</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Chapters Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">📑 Table of Contents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter) => {
              const colorClasses = {
                blue: 'border-blue-300 bg-blue-50 hover:bg-blue-100',
                green: 'border-green-300 bg-green-50 hover:bg-green-100',
                purple: 'border-purple-300 bg-purple-50 hover:bg-purple-100',
                orange: 'border-orange-300 bg-orange-50 hover:bg-orange-100',
                indigo: 'border-indigo-300 bg-indigo-50 hover:bg-indigo-100',
                teal: 'border-teal-300 bg-teal-50 hover:bg-teal-100',
                pink: 'border-pink-300 bg-pink-50 hover:bg-pink-100',
                cyan: 'border-cyan-300 bg-cyan-50 hover:bg-cyan-100',
                violet: 'border-violet-300 bg-violet-50 hover:bg-violet-100'
              }
              
              return (
                <Link
                  key={chapter.number}
                  href={chapter.path}
                  className={`block p-6 rounded-lg border-2 transition transform hover:scale-105 ${colorClasses[chapter.color as keyof typeof colorClasses]}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-500">Chapter {chapter.number}</span>
                    <span className="text-2xl">→</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{chapter.title}</h3>
                  <p className="text-gray-700 text-sm mb-4">{chapter.description}</p>
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Topics Covered:</p>
                    <ul className="flex flex-wrap gap-1">
                      {chapter.topics.map((topic, idx) => (
                        <li key={idx} className="text-xs bg-white px-2 py-1 rounded">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Exercises & Solutions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/hooks-examples/exercises"
            className="block p-6 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-lg text-white hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="text-4xl mb-3">📝</div>
            <h3 className="text-2xl font-bold mb-2">Practice Exercises</h3>
            <p className="text-green-100">
              Test your knowledge with hands-on exercises. Each exercise is designed to reinforce 
              the concepts you've learned.
            </p>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-semibold">Start Practicing →</span>
            </div>
          </Link>

          <Link
            href="/hooks-examples/solutions"
            className="block p-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg text-white hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-2xl font-bold mb-2">Exercise Solutions</h3>
            <p className="text-blue-100">
              Check your answers and learn from detailed solutions. Each solution includes 
              explanations and best practices.
            </p>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-semibold">View Solutions →</span>
            </div>
          </Link>
        </div>

        {/* Learning Path */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🗺️ Recommended Learning Path</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</span>
              <div>
                <p className="font-semibold">Foundation (Chapters 1-2)</p>
                <p className="text-sm text-gray-600">Start with useState and useEffect - these are the most important hooks</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</span>
              <div>
                <p className="font-semibold">State Management (Chapters 3, 7)</p>
                <p className="text-sm text-gray-600">Learn useContext and useReducer for managing complex state</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</span>
              <div>
                <p className="font-semibold">Performance (Chapters 4-5)</p>
                <p className="text-sm text-gray-600">Optimize your apps with useMemo and useCallback</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">4</span>
              <div>
                <p className="font-semibold">Advanced (Chapters 6, 8-9)</p>
                <p className="text-sm text-gray-600">Master useRef, custom hooks, and Next.js concepts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">5</span>
              <div>
                <p className="font-semibold">Practice</p>
                <p className="text-sm text-gray-600">Complete exercises and build projects to reinforce learning</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p className="mb-2">Happy Learning! 🎓</p>
          <p className="text-sm">Remember: The best way to learn is by building. Start with small projects and gradually add complexity.</p>
        </div>
      </div>
    </div>
  )
}
