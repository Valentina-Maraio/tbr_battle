'use client';

import { franc } from "franc-min";
import { useEffect, useState, useMemo } from "react";
import HomePage from "../homepage/page";

// Constants
const ITEMS_PER_BATCH = 5;

export default function ReadingsPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayedBooks, setDisplayedBooks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>("");
  const [bookStatuses, setBookStatuses] = useState<{ [key: string]: string }>({});
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    async function loadBooks() {
      try {
        const jsonData = await import("../data/books.json");
        setBooks(jsonData.default);

        // Initialize the bookStatuses with initial states based on Read_Count
        const initialStatuses: { [key: string]: string } = {};
        jsonData.default.forEach((book: any) => {
          const storedStatus = localStorage.getItem(book.Book_Id);
          initialStatuses[book.Book_Id] = storedStatus || (parseInt(book.Read_Count) > 0 ? "Read" : "Not Read");
        });

        setBookStatuses(initialStatuses);
        setDisplayedBooks(jsonData.default.slice(0, ITEMS_PER_BATCH));
      } catch (error) {
        console.error("Error loading books.json:", error);
      }
    }

    loadBooks();
  }, []);

  const toggleStatus = (bookId: string) => {
    setBookStatuses((prevStatuses) => {
      const currentStatus = prevStatuses[bookId];
      let newStatus = "Not Read";
      if (currentStatus === "Not Read") {
        newStatus = "Reading";
      } else if (currentStatus === "Reading") {
        newStatus = "Read";
      }

      // Store the status in localStorage to persist
      localStorage.setItem(bookId, newStatus);

      return {
        ...prevStatuses,
        [bookId]: newStatus,
      };
    });
  };

  useEffect(() => {
    if (searchQuery) {
      const detectedLanguage = franc(searchQuery);
      setLanguage(detectedLanguage);
    }
  }, [searchQuery]);

  // Memoize the filteredBooks calculation
  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        (book.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.Author.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (language ? book.Language === language : true) &&
        (selectedStatus ? bookStatuses[book.Book_Id] === selectedStatus : true)
    );
  }, [books, searchQuery, language, selectedStatus, bookStatuses]);

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_BATCH);

  const handlePageChange = (page: number) => {
    const startIdx = (page - 1) * ITEMS_PER_BATCH;
    const endIdx = startIdx + ITEMS_PER_BATCH;
    setDisplayedBooks(filteredBooks.slice(startIdx, endIdx));
    setCurrentPage(page);
    setHasMore(page < totalPages);
  };

  useEffect(() => {
    setDisplayedBooks(filteredBooks.slice(0, ITEMS_PER_BATCH));
    setHasMore(filteredBooks.length > ITEMS_PER_BATCH);
  }, [filteredBooks]);

  return (
    <HomePage>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-4">
          <div className="w-full max-w-4xl flex items-center bg-gray-100 shadow-lg rounded-lg p-4">
            <input
              type="text"
              placeholder="Search by title or author..."
              className="flex-1 px-4 py-2 rounded-l-lg border-none outline-none"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700"
              onClick={() => {
                setDisplayedBooks(filteredBooks.slice(0, ITEMS_PER_BATCH));
                setHasMore(filteredBooks.length > ITEMS_PER_BATCH);
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex justify-center mb-8">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Read">Read</option>
            <option value="Reading">Reading</option>
            <option value="Not Read">Not Read</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date Added</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Detected Language</th>
              </tr>
            </thead>
            <tbody>
              {displayedBooks.length > 0 ? (
                displayedBooks.map((book) => (
                  <tr key={book.Book_Id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{book.Title}</td>
                    <td className="border border-gray-300 px-4 py-2">{book.Author}</td>
                    <td className="border border-gray-300 px-4 py-2">{book.Date_Added}</td>
                    <td
                      onClick={() => toggleStatus(book.Book_Id)}
                      className={`border border-gray-300 px-4 py-2 font-medium cursor-pointer ${bookStatuses[book.Book_Id] === "Read"
                        ? "text-green-600"
                        : bookStatuses[book.Book_Id] === "Reading"
                          ? "text-yellow-600"
                          : "text-red-600"
                        }`}
                    >
                      {bookStatuses[book.Book_Id]}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {franc(book.Title)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                  >
                    No books found. Try adjusting your search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredBooks.length > 0 && (
          <div className="flex justify-between items-center mt-6 max-w-4xl mx-auto">
            <button
              className={`px-4 py-2 rounded-md ${currentPage > 1
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <p className="text-sm text-gray-700">
              Page <span className="font-medium">{currentPage}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </p>
            <button
              className={`px-4 py-2 rounded-md ${hasMore
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              disabled={!hasMore}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </HomePage>
  );
}