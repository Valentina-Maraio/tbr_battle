import "./globals.css"; // Import global styles
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <nav className="w-64 bg-gray-800 text-white fixed top-0 left-0 bottom-0 flex flex-col items-start p-4">
            <h2 className="text-lg font-bold mb-6">TBR Battle</h2>

            {/* Grid for buttons */}
            <div className="grid grid-cols-2 gap-10 mb-6">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/about" className="hover:underline">
                About
              </Link>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              {/* Add more links as needed */}
            </div>

            {/* Bottom Buttons */}
            <div className="mt-auto flex space-x-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full">
                <i className="fa-solid fa-gear"></i>
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full">
              <i className="fa-solid fa-palette"></i>
              </button>
            </div>
          </nav>

          {/* Main Content (space for the sidebar) */}
          <div className="flex-1 ml-64 flex flex-col">
            {/* Top Section */}
            <div className="w-full bg-blue-500 text-white p-4 flex items-center justify-between">
              {/* Search Section */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-3 py-1 rounded border border-gray-300"
                />
                <button className="bg-gray-800 text-white px-4 py-1 rounded hover:bg-gray-700">
                  Search
                </button>
              </div>

              {/* Notification and Profile Buttons */}
              <div className="flex space-x-4">
                {/* Bell Notification Button */}
                <button className="text-white hover:text-gray-200">
                  <i className="fas fa-bell"></i> {/* You can use FontAwesome or any icon library */}
                </button>

                {/* Profile Button */}
                <button className="text-white hover:text-gray-200">
                  <i className="fas fa-user"></i> {/* Profile icon */}
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
