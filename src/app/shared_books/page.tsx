"use client";

import { v4 as uuidv4 } from 'uuid';
import HomePage from "../homepage/page";
import { useState, useEffect } from "react";
import '../globals.css'

type ShareABook = {
  id: string,
  title: string;
  author: string;
  completed: boolean;
  sharedWith: string;
};

export default function SharedPage() {
  const [shared, setShared] = useState<ShareABook[]>([]);
  const [input, setInput] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [sharedWith, setSharedWith] = useState("");

  // Load books from localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedBooks = localStorage.getItem("sharedBooks");
      if (storedBooks) {
        setShared(JSON.parse(storedBooks));
      }
    }
  }, []);

  // Save books to localStorage whenever the shared list changes
  useEffect(() => {
    if (shared.length > 0) {
      localStorage.setItem("sharedBooks", JSON.stringify(shared));
    }
  }, [shared]);

  const addASharedBook = () => {
    if (input.trim() && inputAuthor.trim() && sharedWith.trim()) {
      const newBook: ShareABook = {
        id: uuidv4(), // Correctly generate a unique ID
        title: input.trim(),
        author: inputAuthor.trim(),
        completed: false,
        sharedWith: sharedWith.trim(),
      };
      setShared((prev) => [...prev, newBook]);
      setInput("");
      setInputAuthor("");
      setSharedWith("");
    }
  };

  const deleteBook = (id: string) => {
    setShared((prev) => prev.filter((share) => share.id !== id));
  };

  return (
    <HomePage>
      <div className="flex flex-col lg:flex-row gap-10 px-6 mt-10">
        {/* Left Section: Form to Add a Book */}
        <div className="lg:w-1/3 space-y-4">
          <h1 className="text-3xl font-semibold text-center text-var(--text) mb-6">Share a Book</h1>
          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-var(--text)">Book Title</label>
              <input
                type="text"
                id="title"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="mt-2 w-full p-3 border border-var(--secondary) rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter book title"
                required
              />
            </div>

            {/* Author Input */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-var(--text)">Author</label>
              <input
                type="text"
                id="author"
                value={inputAuthor}
                onChange={(e) => setInputAuthor(e.target.value)}
                className="mt-2 w-full p-3 border border-var(--secondary) rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter author's name"
                required
              />
            </div>

            {/* Shared With Input */}
            <div>
              <label htmlFor="sharedWith" className="block text-sm font-medium text-var(--text)">You're sharing this book with</label>
              <input
                type="text"
                id="sharedWith"
                value={sharedWith}
                onChange={(e) => setSharedWith(e.target.value)}
                className="mt-2 w-full p-3 border border-var(--secondary) rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter name of person you're sharing with"
                required
              />
            </div>

            {/* Share Button */}
            <div className="flex justify-center mt-6 border border-2 rounded-lg text-white" style={{ backgroundColor: 'var(--primary)', borderColor: 'var(--accent)' }}>
              <button
                onClick={addASharedBook}
                className="w-full sm:w-auto text-var(--text) px-6 py-3 rounded-lg text-lg font-medium hover:bg-var(--accent) transition-colors"
              >
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Book Grid */}
        <div className="lg:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-autoborder border-var(--secondary) p-4 bg-var(--background)">
            {shared.length === 0 ? (
              <p className="text-center text-var(--secondary) mb-6">Add a book and share it with your friends</p>
            ) : (
              shared.map((book) => (
                <div
                  key={book.id}
                  className="relative flex flex-col justify-between items-center h-36 bg-var(--accent) shadow-lg border-2 rounded-lg p-4 group"
                >
                  {/* Penguin Book Cover Styling: Title and Author */}
                  <div className="flex flex-col justify-center items-center text-center">
                    <h3 className="text-3xl font-bold">{book.title}</h3>
                    <p className="text-xl italic">{book.author}</p>
                  </div>

                  {/* Delete Button: Positioned in the top-right corner */}
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="absolute top-2 right-2 text-xl font-bold hover:text-gray-300"
                    style={{ color: 'var(--accent)' }}
                  >
                    x
                  </button>

                  {/* Shared With Name: Initially hidden, appears on hover */}
                  <div className="absolute bottom-4 left-0 right-0 text-center text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    Shared with: {book.sharedWith}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </HomePage>
  );
}
