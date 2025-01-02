'use client'

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [authorChartData, setAuthorChartData] = useState<any>(null);
  const [readingGoal, setReadingGoal] = useState<number | string>(''); // State for reading goal

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

  // Prepare the chart data for books per year
  useEffect(() => {
    if (books.length > 0) {
      const booksPerYear = books.reduce((acc: any, book: any) => {
        const year = book.Year_Published;
        if (acc[year]) {
          acc[year] += 1;
        } else {
          acc[year] = 1;
        }
        return acc;
      }, {});

      const years = Object.keys(booksPerYear);
      const bookCounts = Object.values(booksPerYear);

      setChartData({
        labels: years,
        datasets: [
          {
            label: "Books Added Per Year",
            data: bookCounts,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [books]);

  // Prepare the chart data for the most read/added authors
  useEffect(() => {
    if (books.length > 0) {
      const authorsCount = books.reduce((acc: Record<string, number>, book: any) => {
        const author = book.Author;
        if (acc[author]) {
          acc[author] += 1;
        } else {
          acc[author] = 1;
        }
        return acc;
      }, {});

      const sortedAuthors = Object.entries(authorsCount)
        .sort(([authorA, countA], [authorB, countB]) => {
          return countB - countA; // Sort in descending order
        })
        .slice(0, 10);

      const topAuthors = sortedAuthors.map(([author]) => author);
      const topAuthorCounts = sortedAuthors.map(([, count]) => count);

      setAuthorChartData({
        labels: topAuthors,
        datasets: [
          {
            label: "Most Read/Added Authors",
            data: topAuthorCounts,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [books]);

  // Handle the change in the reading goal input
  const handleGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReadingGoal(event.target.value);
  };

  return (
    <div className="overflow-hidden">
      <h1 className="text-2xl font-bold text-center md:text-left">
        Welcome to the TBR Battle Dashboard!
      </h1>
      <p className="text-center md:text-left">Use the menu on the left to navigate.</p>

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
              className="bg-blue-500 text-white p-2 rounded"
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

        {/* Additional Content */}
        <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
          <h2 className="font-semibold">Additional Content</h2>
          <p>Some additional content or info.</p>
        </div>

        {/* Total Books */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-t-lg"></div>
          <h2 className="font-semibold text-lg mb-4">Total Books</h2>
          <p className="text-4xl font-extrabold text-blue-600">{books.length}</p>
          <p className="text-sm mt-2 text-gray-500">Total books in your collection</p>
        </div>

        {/* Chart occupying two cells */}
        <div className="col-span-1 md:col-span-2 row-span-2 bg-gray-200 p-4   rounded-lg shadow-lg">
          {chartData && (
            <>
              <h2 className="font-semibold text-center mb-4">Books Added Per Year</h2>
              <Bar data={chartData} />
            </>
          )}
        </div>

        {/* Top 10 Most Read/Added Authors */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
          <h2 className="font-semibold text-lg mb-4 text-center md:text-left">
            Top 10 Most Read/Added Authors
          </h2>
          {authorChartData && <Bar data={authorChartData} />}
        </div>
      </div>
    </div>
  );
}
