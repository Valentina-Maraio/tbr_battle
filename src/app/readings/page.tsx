"use client"; // Required for client-side rendering

import { useEffect, useState } from "react";
import HomePage from "../homepage/page";

export default function ReadingsPage() {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    async function loadBooks() {
      try {
        const jsonData = await import("../data/books.json");
        setBooks(jsonData.default);
      } catch (error) {
        console.error("Error loading books.json:", error);
      }
    }

    loadBooks();
  }, []);

  return (
    <HomePage>
      <div>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <ul className="mt-4">
          {books.map((book) => (
            <li key={book.Book_Id} className="mb-4 border-b pb-2">
              <h2 className="font-semibold">{book.Title}</h2>
              <p>Author: {book.Author}</p>
              <p>Date Added: {book.Date_Added}</p>
              <p>Status: {parseInt(book.Read_Count) > 0 ? "Read" : "Not Read"}</p>
            </li>
          ))}
        </ul>
      </div>
    </HomePage>
  );
}