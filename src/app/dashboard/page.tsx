'use client'

import { useState, useEffect } from "react";
import BooksPerYearChart from "../charts/BooksPerYearChart";
import TopAuthorsChart from "../charts/TopAuthorsChart";
import HomePage from "../homepage/page";
import BooksByPublisherChart from "../charts/BooksByPublisherChart";
import '../globals.css';

export default function Dashboard() {
  const [books, setBooks] = useState<any[]>([]);

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


  return (
    <HomePage>
      <div className="overflow-hidden">
        <div className="bg-gray-200 p-1 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-2">
            Welcome to the TBR Battle Dashboard!
          </h1>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 mt-8">

          {/* Books by Publisher */}
          <div className="bg-gray-200 p-6 rounded-lg row-span-1 shadow-lg flex flex-col items-center justify-center relative">
            <h2 className="font-semibold text-center mb-4">Books by Publisher</h2>
            <BooksByPublisherChart books={books} />
            <p className="mt-4 text-center text-sm text-gray-600">
              This chart visualizes the distribution of books across different publishers in the dataset. By showing the number of books published by each publisher, it provides insights into the variety and reach of the publishers represented. This can be helpful for identifying dominant publishers and understanding the diversity of sources in your library or reading collection.
            </p>
          </div>

          {/* Top 10 Most Read/Added Authors */}
          <div className="bg-gray-200 p-6 rounded-lg row-span-1 col-span-2 shadow-lg">
            <h2 className="font-semibold text-lg mb-4 text-center md:text-left">
              Top 10 Most Read/Added Authors
            </h2>
            <TopAuthorsChart books={books} />
            <p className="mt-4 text-center text-sm text-gray-600">
              The "Top 10 Most Read/Added Authors" chart highlights the most popular authors within the dataset. It tracks the number of times their books were read or added, giving an indication of which authors have captured the most attention from the audience. This can be useful for tracking reading trends, discovering emerging authors, or simply keeping tabs on which authors are most frequently selected.
            </p>
          </div>

          {/* Chart occupying two cells */}
          <div className="col-span-1 md:col-span-3 row-span-1 bg-gray-200 p-4 rounded-lg shadow-lg">
            <BooksPerYearChart books={books} />
            <p className="mt-4 text-center text-sm text-gray-600">
              This chart provides a timeline of book publications over the years, showing how the number of books published has evolved over time. It helps to highlight trends in the publishing industry, such as periods of growth or decline, and can reveal historical patterns in the dataset. Analyzing the number of books published per year can also provide context for understanding shifts in genres, author activity, or the impact of various global events on publishing.
            </p>
          </div>
        </div>
      </div>
    </HomePage>
  );
}
