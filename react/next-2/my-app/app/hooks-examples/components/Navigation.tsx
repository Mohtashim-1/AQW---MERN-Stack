'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const chapters = [
  { id: 'index', title: ' Table of Contents', path: '/hooks-examples' },
  { id: 'useState', title: 'Chapter 1: useState', path: '/hooks-examples/useState' },
  { id: 'useEffect', title: 'Chapter 2: useEffect', path: '/hooks-examples/useEffect' },
  { id: 'useContext', title: 'Chapter 3: useContext', path: '/hooks-examples/useContext' },
  { id: 'useMemo', title: 'Chapter 4: useMemo', path: '/hooks-examples/useMemo' },
  { id: 'useCallback', title: 'Chapter 5: useCallback', path: '/hooks-examples/useCallback' },
  { id: 'useRef', title: 'Chapter 6: useRef', path: '/hooks-examples/useRef' },
  { id: 'useReducer', title: 'Chapter 7: useReducer', path: '/hooks-examples/useReducer' },
  { id: 'custom-hooks', title: 'Chapter 8: Custom Hooks', path: '/hooks-examples/custom-hooks' },
  { id: 'nextjs-concepts', title: 'Chapter 9: Next.js Concepts', path: '/hooks-examples/nextjs-concepts' },
  { id: 'exercises', title: 'Exercises', path: '/hooks-examples/exercises' },
  { id: 'solutions', title: ' Solutions', path: '/hooks-examples/solutions' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">React & Next.js Learning Guide</h1>
          <Link 
            href="/hooks-examples" 
            className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-50 transition"
          >
             Home
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {chapters.map((chapter) => {
            const isActive = pathname === chapter.path || 
              (chapter.path === '/hooks-examples' && pathname === '/hooks-examples')
            return (
              <Link
                key={chapter.id}
                href={chapter.path}
                className={`px-3 py-1 rounded text-sm transition ${
                  isActive
                    ? 'bg-white text-blue-600 font-semibold'
                    : 'bg-blue-500/50 hover:bg-blue-500/70'
                }`}
              >
                {chapter.title}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

