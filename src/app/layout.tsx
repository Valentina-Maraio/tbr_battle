'use client';

import './globals.css';
import Link from 'next/link';
import { useState } from 'react';

const Modal = ({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user: { name: string; surname: string; email: string } }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">User Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Surname:</strong> {user.surname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock user data
  const user = {
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
  };

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
            className={`fixed lg:relative top-0 left-0 bottom-0 bg-gray-800 text-white z-20 transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } transition-transform duration-300 w-64 p-4 flex flex-col justify-between max-h-screen overflow-y-auto`}
          >
            {/* Top Section */}
            <div>
              <h2 className="text-lg font-bold mb-6">TBR Battle</h2>
              <div className="grid grid-cols-2 gap-8 mb-6">
                <Link
                  href="/"
                  className="flex flex-col items-center justify-center text-center p-4 space-y-2 hover:underline"
                  onClick={closeSidebar}
                >
                  <div className="w-16 h-16 flex items-center justify-center border-2 border-gray-300 rounded-lg">
                    <i className="fa-solid fa-chart-line"></i>
                  </div>
                  <span className="text-sm text-white-700">Dashboard</span>
                </Link>
                <Link
                  href="/readings"
                  className="flex flex-col items-center justify-center text-center p-4 space-y-2 hover:underline"
                  onClick={closeSidebar}
                >
                  <div className="w-16 h-16 flex items-center justify-center border-2 border-gray-300 rounded-lg">
                    <i className="fa-solid fa-glasses"></i>
                  </div>
                  <span className="text-sm text-white-700">Readings</span>
                </Link>
                <Link
                  href="/shared_books"
                  className="flex flex-col items-center justify-center text-center p-4 space-y-2 hover:underline"
                  onClick={closeSidebar}
                >
                  <div className="w-16 h-16 flex items-center justify-center border-2 border-gray-300 rounded-lg">
                    <i className="fa-solid fa-people-group"></i>
                  </div>
                  <span className="text-sm text-white-700">Shared</span>
                </Link>
                <Link href="/goals"
                  className="flex flex-col items-center justify-center text-center p-4 space-y-2 hover:underline"
                  onClick={closeSidebar}>
                  <div className="w-16 h-16 flex items-center justify-center border-2 border-gray-300 rounded-lg">
                    <i className="fa-solid fa-trophy"></i>
                  </div>
                  <span className="text-sm text-white-700">Goals</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex flex-col items-center justify-center text-center p-4 space-y-2 hover:underline"
                  onClick={closeSidebar}
                >
                  <div className="w-16 h-16 flex items-center justify-center border-2 border-gray-300 rounded-lg">
                    <i className="fas fa-bell text-xl"></i>
                  </div>
                  <span className="text-sm text-white-700">Notification</span>
                </Link>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-4 flex space-x-4">
              <button
                className="text-white p-4 rounded-full"
                onClick={() => setIsModalOpen(true)}>
                <i className="fa-solid fa-gear"></i>
              </button>
              <button className="text-white p-4 rounded-full">
                <i className="fas fa-bell"></i>
              </button>
              <button className="text-white p-4 rounded-full">
                <i className="fas fa-user"></i>
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

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={user} />
      </body>
    </html>
  );
}
