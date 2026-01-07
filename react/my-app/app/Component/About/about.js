// NEXT.JS TOPIC 1: SERVER COMPONENT (default in Next.js App Router)
// This is a Server Component - runs on the server, no 'use client' directive
// Server Components can directly access databases, file systems, etc.

const About = () => {
  // This runs on the server, so we can do server-side operations
  const serverTime = new Date().toLocaleString()
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Page</h1>
      
      <section className="mb-8 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Next.js Topic 1: Server Components</h2>
        <p className="mb-4">
          This page is a <strong>Server Component</strong>. It renders on the server,
          which means:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Faster initial page load</li>
          <li>Better SEO (content is available immediately)</li>
          <li>Can access backend resources directly</li>
          <li>Smaller JavaScript bundle sent to client</li>
        </ul>
        <p className="text-sm text-gray-600">
          Server render time: {serverTime}
        </p>
      </section>

      <section className="mb-8 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Next.js Topic 2: File-based Routing</h2>
        <p className="mb-4">
          Next.js uses <strong>file-based routing</strong>. The file structure determines the URL:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li><code className="bg-gray-100 px-2 py-1 rounded">app/page.tsx</code> → <code>/</code></li>
          <li><code className="bg-gray-100 px-2 py-1 rounded">app/Component/About/about.js</code> → This would need to be in <code>app/about/page.js</code> for <code>/about</code></li>
          <li><code className="bg-gray-100 px-2 py-1 rounded">app/products/[id]/page.js</code> → <code>/products/123</code> (dynamic route)</li>
        </ul>
      </section>
    </div>
  )
}

export default About
