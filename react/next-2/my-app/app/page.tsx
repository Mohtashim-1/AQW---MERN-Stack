import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Next.js App</h1>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-bold mb-2">React Hooks Examples</h2>
          <p className="mb-4 text-gray-600">
            Learn how to use React hooks in Next.js with practical examples.
          </p>
          <Link 
            href="/hooks-examples"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            View Hooks Examples →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page