'use client'

import ChapterLayout from '../components/ChapterLayout'

export default function NextJsConceptsPage() {
  return (
    <ChapterLayout 
      title="Next.js Concepts"
      chapterNumber={9}
      description="Understand Next.js specific features and patterns"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 bg-violet-50 border-l-4 border-violet-500 p-6 rounded">
          <h2 className="text-2xl font-bold text-violet-900 mb-3">Next.js Specific Features</h2>
        </div>
        <div className="space-y-4">
          <div className="border-2 border-green-500 p-4 rounded">
            <h3 className="font-bold text-green-900 mb-2">Server Components (Default)</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm">
              <li>Run on the server</li>
              <li>Can access databases directly</li>
              <li>No 'use client' directive</li>
              <li>Cannot use hooks</li>
            </ul>
          </div>
          <div className="border-2 border-blue-500 p-4 rounded">
            <h3 className="font-bold text-blue-900 mb-2">Client Components</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm">
              <li>Must have 'use client' at top</li>
              <li>Can use all React hooks</li>
              <li>Can use browser APIs</li>
              <li>Needed for interactivity</li>
            </ul>
          </div>
          <div className="border-2 border-purple-500 p-4 rounded">
            <h3 className="font-bold text-purple-900 mb-2">File-based Routing</h3>
            <p className="text-sm text-gray-700">app/about/page.tsx → /about route</p>
          </div>
        </div>
      </div>
    </ChapterLayout>
  )
}

