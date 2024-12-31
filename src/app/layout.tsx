'use client';

import './globals.css';
import Link from 'next/link';
import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close sidebar when a link is clicked
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <nav
            className={`fixed lg:relative top-0 left-0 bottom-0 bg-gray-800 text-white z-20 transform lg:translate-x-0 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 w-64 p-4 flex flex-col justify-between max-h-screen overflow-y-auto`}
          >
            {/* Top Section */}
            <div>
              <h2 className="text-lg font-bold mb-6">TBR Battle</h2>
              <div className="grid grid-cols-2 gap-10 mb-6">
                <Link href="/" className="hover:underline" onClick={closeSidebar}>
                  Home
                </Link>
                <Link href="/about" className="hover:underline" onClick={closeSidebar}>
                  About
                </Link>
                <Link href="/dashboard" className="hover:underline" onClick={closeSidebar}>
                  Dashboard
                </Link>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-4 flex space-x-4">
              <button className="text-white p-4 rounded-full">
                <i className="fa-solid fa-gear"></i>
              </button>
              <button className="text-white p-4 rounded-full">
                <i className="fa-solid fa-palette"></i>
              </button>
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Top Bar */}
            <div className="w-full bg-blue-500 text-white p-4 flex items-center justify-between fixed top-0 z-10">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-white hover:text-gray-200"
                onClick={toggleSidebar}
              >
                <i className="fas fa-bars"></i>
              </button>
              <div className="hidden lg:flex space-x-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-3 py-1 rounded border border-gray-300"
                />
                <button className="bg-gray-800 text-white px-4 py-1 rounded hover:bg-gray-700">
                  Search
                </button>
              </div>
              <div className="flex space-x-4">
                <button className="text-white hover:text-gray-200">
                  <i className="fas fa-bell"></i>
                </button>
                <button className="text-white hover:text-gray-200">
                  <i className="fas fa-user"></i>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <main
              className="flex-1 p-8 overflow-y-auto mt-[64px]" // Adjust `mt-[64px]` to match the height of the top bar
              style={{
                marginLeft: isSidebarOpen ? '16rem' : '0', // Adjust content position when the sidebar is open
                transition: 'margin-left 0.3s ease',
              }}
            >
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}