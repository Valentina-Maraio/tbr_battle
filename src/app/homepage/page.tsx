'use client';

import '../globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import ProtectedRoute from '../protectRoute';
import { ThemeProvider, useTheme } from '../ThemeContext';

const Modal = ({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user: { name: string; surname: string; email: string } }) => {
  if (!isOpen) return null;
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }} className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div style={{ backgroundColor: 'var(--background)', color: 'var(--text)', boxShadow: '0 4px 6px var(--secondary)' }} className="p-6 rounded w-80">
        <h2 className="text-lg font-bold mb-4">User Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Surname:</strong> {user.surname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button
          style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}
          className="mt-4 px-4 py-2 rounded hover:opacity-90"
          onClick={onClose}
        >
          Close
        </button>
        <button
          onClick={handleLogout}
          style={{ backgroundColor: 'var(--accent)', color: 'var(--background)' }}
          className="ml-2 px-4 py-2 rounded hover:opacity-90 focus:outline-none focus:ring-2"
        >Logout</button>
      </div>
    </div>
  );
};

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'blue')}
      style={{ backgroundColor: 'var(--secondary)', color: 'var(--background)' }}
      className="p-2 rounded"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="blue">Blue</option>
    </select>
  );
};

export default function HomePage({ children }: { children: React.ReactNode }) {
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
    <ThemeProvider>
      <ProtectedRoute>
        <html lang="en">
          <body style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}>
            <div className="flex min-h-screen">
              {/* Sidebar */}
              <nav
                style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}
                className={`fixed lg:relative top-0 left-0 bottom-0 z-20 transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                  } transition-transform duration-300 w-64 p-4 flex flex-col justify-between max-h-screen overflow-y-auto`}
              >
                {/* Top Section */}
                <div>
                  <h2 className="text-lg font-bold mb-6">TBR Battle</h2>
                  <div className="grid grid-cols-2 gap-8 mb-6">
                    <Link
                      href="/dashboard"
                      className="flex flex-col items-center justify-center text-center p-4 space-y-2 hover:underline"
                      onClick={closeSidebar}
                    >
                      <div style={{ borderColor: 'var(--accent)' }} className="w-16 h-16 flex items-center justify-center border-2 rounded-lg">
                        <i className="fa-solid fa-chart-line"></i>
                      </div>
                      <span className="text-sm">Dashboard</span>
                    </Link>
                    <Link
                      href="/readings"
                      className="flex flex-col items-center justify-center text-center p-4 space-y-2 hover:underline"
                      onClick={closeSidebar}
                    >
                      <div style={{ borderColor: 'var(--accent)' }} className="w-16 h-16 flex items-center justify-center border-2 rounded-lg">
                        <i className="fa-solid fa-glasses"></i>
                      </div>
                      <span className="text-sm">Readings</span>
                    </Link>
                    <Link
                      href="/shared_books"
                      className="flex flex-col items-center justify-center text-center p-4 space-y-2 hover:underline"
                      onClick={closeSidebar}
                    >
                      <div style={{ borderColor: 'var(--accent)' }} className="w-16 h-16 flex items-center justify-center border-2 rounded-lg">
                        <i className="fa-solid fa-people-group"></i>
                      </div>
                      <span className="text-sm">Shared</span>
                    </Link>
                    <Link
                      href="/goals"
                      className="flex flex-col items-center justify-center text-center p-4 space-y-2 hover:underline"
                      onClick={closeSidebar}
                    >
                      <div style={{ borderColor: 'var(--accent)' }} className="w-16 h-16 flex items-center justify-center border-2 rounded-lg">
                        <i className="fa-solid fa-trophy"></i>
                      </div>
                      <span className="text-sm">Goals</span>
                    </Link>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-4 flex space-x-4 items-center">
                  <button
                    style={{ color: 'var(--background)' }}
                    className="p-4 rounded-full hover:opacity-80"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <i className="fa-solid fa-gear"></i>
                  </button>
                  <button style={{ color: 'var(--background)' }} className="p-4 rounded-full hover:opacity-80">
                    <i className="fas fa-user"></i>
                  </button>
                  <ThemeSelector />
                </div>
              </nav>

              {/* Main Content */}
              <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <div style={{ backgroundColor: 'var(--secondary)', color: 'var(--background)' }} className="w-full p-4 flex items-center justify-between fixed top-0 z-10">
                  {/* Mobile Menu Button */}
                  <button
                    className="lg:hidden hover:opacity-80"
                    onClick={toggleSidebar}
                  >
                    <i className="fas fa-bars"></i>
                  </button>
                  <div className="hidden lg:flex space-x-2">
                    <input
                      type="text"
                      placeholder="Search..."
                      style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}
                      className="px-3 py-1 rounded border"
                    />
                    <button style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }} className="px-4 py-1 rounded hover:opacity-90">
                      Search
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <main
                  className="flex-1 p-8 overflow-y-auto mt-[64px]"
                  style={{
                    marginLeft: isSidebarOpen ? '16rem' : '0',
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
      </ProtectedRoute>
    </ThemeProvider>
  );
}