// components/charts/BooksPerYearChart.tsx

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BooksPerYearChart({ books }: { books: any[] }) {
  const [chartData, setChartData] = useState<any>(null);

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

  return chartData ? <Bar data={chartData} /> : null;
}
