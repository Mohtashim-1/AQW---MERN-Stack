'use client'

import { useState, useEffect } from 'react'
import ChapterLayout from '../components/ChapterLayout'

export default function UseEffectPage() {
  const [count, setCount] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [data, setData] = useState<string | null>(null)

  // Effect 1: Runs on every render
  useEffect(() => {
    document.title = `Count: ${count}`
  })

  // Effect 2: Runs only once on mount
  useEffect(() => {
    console.log('🎉 Component mounted!')
    setWindowWidth(window.innerWidth)
    return () => {
      console.log('👋 Component unmounted!')
    }
  }, [])

  // Effect 3: Runs when count changes
  useEffect(() => {
    console.log(`📊 Count changed to: ${count}`)
  }, [count])

  // Effect 4: Window resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Effect 5: Simulating API call
  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 5000))
      setData('Data loaded successfully! 🎉')
    }
    fetchData()
  }, [])

  return (
    <ChapterLayout 
      title="useEffect Hook - Side Effects & Lifecycle"
      chapterNumber={2}
      description="Master side effects, lifecycle methods, and data fetching"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded mb-6">
            <h2 className="text-2xl font-bold text-green-900 mb-3">What is useEffect?</h2>
            <p className="text-gray-700 mb-3">
              <strong>useEffect</strong> lets you perform "side effects" in functional components.
              Side effects are things that happen OUTSIDE of rendering, like fetching data, 
              setting up subscriptions, or manually changing the DOM.
            </p>
            <div className="bg-white p-4 rounded mt-4">
              <p className="font-semibold mb-2">Syntax:</p>
              <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
{`useEffect(() => {
  // Your side effect code
  return () => {
    // Cleanup (optional)
  }
}, [dependencies])`}
              </pre>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
            <h3 className="font-semibold text-yellow-900 mb-2">📚 Learning Objectives:</h3>
            <ul className="list-disc list-inside space-y-1 text-yellow-800">
              <li>Understand what side effects are</li>
              <li>Learn when to use useEffect</li>
              <li>Master the dependency array</li>
              <li>Understand cleanup functions</li>
              <li>Learn to prevent memory leaks</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-2 border-green-300 rounded-lg p-6 bg-green-50">
            <h3 className="text-xl font-bold text-green-900 mb-3">Example 1: Update Document Title</h3>
            <p className="text-gray-700 mb-4">
              Check your browser tab title - it updates with the count! 
              This effect runs on every render (no dependency array).
            </p>
            <div className="bg-white p-4 rounded border mb-4">
              <p className="text-lg font-mono mb-3">Count: <span className="font-bold text-green-600">{count}</span></p>
              <button 
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Increment (watch tab title!)
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold mb-2 text-sm">Code:</p>
              <pre className="text-xs overflow-x-auto">
{`useEffect(() => {
  document.title = \`Count: ${count}\`
}) // No dependency array = runs every render`}
              </pre>
            </div>
          </div>

          <div className="border-2 border-blue-300 rounded-lg p-6 bg-blue-50">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Example 2: Run Once on Mount</h3>
            <p className="text-gray-700 mb-4">
              Empty dependency array [] means "run once when component mounts".
              Perfect for initialization, API calls, or setting up subscriptions.
            </p>
            <div className="bg-white p-4 rounded border mb-4">
              <p className="text-lg mb-2">
                Window Width: <span className="font-bold text-blue-600">{windowWidth}px</span>
              </p>
              <p className="text-xs text-gray-500">💡 Open browser console to see mount/unmount messages</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold mb-2 text-sm">Code:</p>
              <pre className="text-xs overflow-x-auto">
{`useEffect(() => {
  console.log('Component mounted!')
  // Setup code here
  return () => {
    console.log('Component unmounted!')
    // Cleanup code here
  }
}, []) // Empty array = run once`}
              </pre>
            </div>
          </div>

          <div className="border-2 border-purple-300 rounded-lg p-6 bg-purple-50">
            <h3 className="text-xl font-bold text-purple-900 mb-3">Example 3: Run When Dependencies Change</h3>
            <p className="text-gray-700 mb-4">
              Effect runs when count changes. Check console to see the log!
            </p>
            <div className="bg-white p-4 rounded border mb-4">
              <p className="text-lg mb-3">Count: <span className="font-bold">{count}</span></p>
              <button 
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Increment (check console!)
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold mb-2 text-sm">Code:</p>
              <pre className="text-xs overflow-x-auto">
{`useEffect(() => {
  console.log(\`Count changed to: ${count}\`)
}, [count]) // Runs when count changes`}
              </pre>
            </div>
          </div>

          <div className="border-2 border-orange-300 rounded-lg p-6 bg-orange-50">
            <h3 className="text-xl font-bold text-orange-900 mb-3">Example 4: Event Listener with Cleanup</h3>
            <p className="text-gray-700 mb-4">
              Resize your browser window! The cleanup function removes the event listener 
              when component unmounts, preventing memory leaks.
            </p>
            <div className="bg-white p-4 rounded border mb-4">
              <p className="text-lg">
                Window Width: <span className="font-bold text-orange-600">{windowWidth}px</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">Try resizing your browser window!</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold mb-2 text-sm">Code:</p>
              <pre className="text-xs overflow-x-auto">
{`useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }
  window.addEventListener('resize', handleResize)
  
  // Cleanup: remove listener
  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])`}
              </pre>
            </div>
          </div>

          <div className="border-2 border-teal-300 rounded-lg p-6 bg-teal-50">
            <h3 className="text-xl font-bold text-teal-900 mb-3">Example 5: Simulated API Call</h3>
            <p className="text-gray-700 mb-4">
              This simulates loading data from an API. In real apps, you'd use fetch() or axios.
            </p>
            <div className="bg-white p-4 rounded border mb-4">
              <p className="text-lg">{data || 'Loading... ⏳'}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold mb-2 text-sm">Code:</p>
              <pre className="text-xs overflow-x-auto">
{`useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/api/data')
    const data = await response.json()
    setData(data)
  }
  fetchData()
}, [])`}
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 border-2 border-gray-300 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">🔑 Dependency Array Rules</h3>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded border">
              <p className="font-semibold text-green-700 mb-2">✅ Empty Array []</p>
              <p className="text-sm text-gray-700">Runs once when component mounts</p>
            </div>
            <div className="bg-white p-4 rounded border">
              <p className="font-semibold text-blue-700 mb-2">✅ [value1, value2]</p>
              <p className="text-sm text-gray-700">Runs when value1 or value2 changes</p>
            </div>
            <div className="bg-white p-4 rounded border">
              <p className="font-semibold text-red-700 mb-2">⚠️ No Array</p>
              <p className="text-sm text-gray-700">Runs on every render (usually avoid!)</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-red-50 border-2 border-red-300 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-900 mb-4">⚠️ Common Mistakes</h3>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Missing dependency array:</strong> Effect runs on every render (can cause infinite loops!)</li>
            <li><strong>Forgetting cleanup:</strong> Event listeners and subscriptions can cause memory leaks</li>
            <li><strong>Wrong dependencies:</strong> Effect might not run when needed, or run too often</li>
            <li><strong>Async functions:</strong> Don't make the effect callback async - use async function inside</li>
          </ul>
        </div>
      </div>
    </ChapterLayout>
  )
}

