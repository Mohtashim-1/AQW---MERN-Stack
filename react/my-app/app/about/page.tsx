// NEXT.JS TOPIC 2: FILE-BASED ROUTING
// This file creates the route: /about
// Next.js automatically creates routes based on the file structure in the 'app' directory

import ClientCounter from '../Component/ClientCounter'

// This is a Server Component (default in Next.js)
const AboutPage = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Page - Next.js Routing Example</h1>
      
      <section className="mb-8 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Next.js Topic 2: File-based Routing</h2>
        <p className="mb-4">
          This page is accessible at <code className="bg-gray-100 px-2 py-1 rounded">/about</code> because
          the file is located at <code className="bg-gray-100 px-2 py-1 rounded">app/about/page.tsx</code>
        </p>
        <div className="bg-gray-50 p-4 rounded mt-4">
          <h3 className="font-semibold mb-2">Routing Rules:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><code>app/page.tsx</code> → <code>/</code> (home page)</li>
            <li><code>app/about/page.tsx</code> → <code>/about</code></li>
            <li><code>app/blog/[slug]/page.tsx</code> → <code>/blog/any-slug</code> (dynamic)</li>
            <li><code>app/shop/[...all]/page.tsx</code> → <code>/shop/any/nested/path</code> (catch-all)</li>
          </ul>
        </div>
      </section>

      <section className="mb-8 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Next.js Topic 3: Server + Client Components</h2>
        <p className="mb-4">
          This page is a <strong>Server Component</strong>, but it can use <strong>Client Components</strong>:
        </p>
        <ClientCounter />
      </section>
    </div>
  )
}

export default AboutPage

