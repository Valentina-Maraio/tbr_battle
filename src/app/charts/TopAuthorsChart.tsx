// components/charts/TopAuthorsChart.tsx

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TopAuthorsChart({ books }: { books: any[] }) {
  const [authorChartData, setAuthorChartData] = useState<any>(null);

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

  return authorChartData ? <Bar data={authorChartData} /> : null;
}
