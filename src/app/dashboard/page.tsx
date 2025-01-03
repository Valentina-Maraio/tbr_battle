'use client'

import { useState, useEffect } from "react";
import BooksPerYearChart from "../charts/BooksPerYearChart";
import TopAuthorsChart from "../charts/TopAuthorsChart";
import HomePage from "../homepage/page";
import BooksByPublisherChart from "../charts/BooksByPublisherChart";
import '../globals.css';

export default function Dashboard() {
  const [books, setBooks] = useState<any[]>([]);
  const [readingGoal, setReadingGoal] = useState<number | string>('');

  // Load the books data
  useEffect(() => {
    async function loadBooks() {
      try {
        const jsonData = await import("../data/books.json");
        setBooks(jsonData.default); // The JSON data is accessed via `default`
      } catch (error) {
        console.error("Error loading books.json:", error);
      }
    }

    loadBooks();
  }, []);

  // Load the reading goal from localStorage
  useEffect(() => {
    const savedGoal = localStorage.getItem("readingGoal");
    if (savedGoal) {
      setReadingGoal(savedGoal);
    }
  }, []);

  // Save the reading goal to localStorage whenever it changes
  useEffect(() => {
    if (readingGoal !== '') {
      localStorage.setItem("readingGoal", String(readingGoal));
    }
  }, [readingGoal]);

  // Handle the change in the reading goal input
  const handleGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReadingGoal(event.target.value);
  };

  return (
    <HomePage>
      <div className="overflow-hidden">
        <div className="bg-gray-200 p-1 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-2">
            Welcome to the TBR Battle Dashboard!
          </h1>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 mt-8">
          {/* Reading Goal Section */}
          <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
            <h2 className="font-semibold">Set Your Reading Goal</h2>
            <div className="flex flex-col space-y-2">
              <input
                type="number"
                className="p-2 border rounded"
                placeholder="Enter your reading goal for the year"
                value={readingGoal}
                onChange={handleGoalChange}
              />
              <button
                style={{
                  color: 'var(--text)',               // Keep the text color
                  padding: '10px 20px',
                  border: '2px solid var(--accent)',  // Use the accent color for the border
                  borderRadius: '5px',
                }}
                className="p-2 rounded"
                onClick={() => { }} // Goal is updated automatically
              >
                Set Goal
              </button>
            </div>
            <div className="bg-gray-200 p-3 mt-6">
              <div className="text-xl font-bold text-center">
                {readingGoal
                  ? `Your reading goal for the year is: ${readingGoal}`
                  : "Please set your reading goal."}
              </div>
            </div>
          </div>

          {/* Total Books */}
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center relative">
            <h2 className="font-semibold text-lg mb-4">Total Books</h2>
            <p className="text-4xl font-extrabold text-blue-600"
              style={{
                color: 'var(--text)',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
              }}
            >{books.length}</p>
            <p className="text-sm mt-2 text-gray-500">Total books in your collection</p>
          </div>

          {/* Top 10 Most Read/Added Authors */}
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
            <h2 className="font-semibold text-lg mb-4 text-center md:text-left">
              Top 10 Most Read/Added Authors
            </h2>
            <TopAuthorsChart books={books} />
          </div>

          {/* Chart occupying two cells */}
          <div className="col-span-1 md:col-span-3 row-span-2 bg-gray-200 p-4   rounded-lg shadow-lg">
            <BooksPerYearChart books={books} />
          </div>

          {/* Books by Publisher */}
          <div className="col-span-1 md:col-span-1 row-span-1 bg-gray-200 p-4 rounded-lg shadow-lg">
            <h2 className="font-semibold text-center mb-4">Books by Publisher</h2>
            <BooksByPublisherChart books={books} />
          </div>
        </div>
      </div>
    </HomePage>
  );
}