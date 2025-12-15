'use client'

import Link from 'next/link'
import Navigation from './Navigation'

function getPreviousChapter(num: number): string {
  const chapters = ['', 'useState', 'useEffect', 'useContext', 'useMemo', 'useCallback', 'useRef', 'useReducer', 'custom-hooks', 'nextjs-concepts']
  return chapters[num - 1] || ''
}

function getNextChapter(num: number): string {
  const chapters = ['', 'useState', 'useEffect', 'useContext', 'useMemo', 'useCallback', 'useRef', 'useReducer', 'custom-hooks', 'nextjs-concepts']
  return chapters[num + 1] || ''
}

export default function ChapterLayout({ 
  children, 
  title,
  chapterNumber,
  description 
}: { 
  children: React.ReactNode
  title: string
  chapterNumber?: number
  description?: string
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto max-w-5xl p-8">
        {chapterNumber && (
          <div className="mb-6">
            <span className="text-sm text-gray-500">Chapter {chapterNumber}</span>
            <h1 className="text-4xl font-bold text-gray-900 mt-2">{title}</h1>
            {description && (
              <p className="text-lg text-gray-600 mt-2">{description}</p>
            )}
          </div>
        )}
        {children}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="flex justify-between">
            <Link 
              href={chapterNumber && chapterNumber > 1 ? `/hooks-examples/${getPreviousChapter(chapterNumber)}` : '/hooks-examples'}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              ← Previous
            </Link>
            <Link 
              href={chapterNumber && chapterNumber < 9 ? `/hooks-examples/${getNextChapter(chapterNumber)}` : '/hooks-examples/exercises'}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Next →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

