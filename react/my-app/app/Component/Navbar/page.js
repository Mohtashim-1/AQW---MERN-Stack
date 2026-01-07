import Link from 'next/link'

// NEXT.JS TOPIC: NAVIGATION WITH LINK COMPONENT
// Next.js provides a Link component for client-side navigation
const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex gap-6">
        <Link href="/" className="hover:text-blue-300 transition">
          Home
        </Link>
        <Link href="/about" className="hover:text-blue-300 transition">
          About
        </Link>
        <span className="text-gray-500">|</span>
        <span className="text-sm text-gray-400">Next.js File-based Routing</span>
      </div>
    </nav>
  )
}

export default Navbar
