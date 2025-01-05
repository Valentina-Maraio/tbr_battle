'use client'

import HomePage from "../homepage/page";
import { useFavorite } from "../context/ReadingContext";

export default function GoalsPage() {
  const { favoriteBooks, removeFavorite } = useFavorite(); 

  return (
    <HomePage>
      <div>
        <h1 className="text-2xl font-bold">Goals</h1>
        <p>Who's reading more books than you?</p>
        {/* Display reading books */}
        {favoriteBooks.length > 0 ? (
          <div>
            <h2>Currently Reading Books:</h2>
            <ul>
              {favoriteBooks.map((book) => (
                <li key={book.Book_Id}>
                  {book.Title} by {book.Author}
                  <button
                    onClick={() => removeFavorite(book.Book_Id)}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No books are being read right now.</p>
        )}
      </div>
    </HomePage>
  );
}
