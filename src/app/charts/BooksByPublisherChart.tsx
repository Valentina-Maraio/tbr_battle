// charts/BooksByPublisherChart.tsx
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registering Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const BooksByPublisherChart: React.FC<{ books: any[] }> = ({ books }) => {
  const [publisherChartData, setPublisherChartData] = useState<any>(null);

  useEffect(() => {
    if (books.length > 0) {
      // Count how many times each publisher appears
      const publisherCount = books.reduce((acc: any, book: any) => {
        const publisher = book.Publisher;
        if (publisher) {
          acc[publisher] = (acc[publisher] || 0) + 1;
        }
        return acc;
      }, {});

      // Sort publishers by count in descending order and pick the top 5
      const sortedPublishers = Object.entries(publisherCount)
        .sort(([, countA], [, countB]) => countB - countA) // Sorting in descending order
        .slice(0, 5); // Only take the top 5

      const topPublishers = sortedPublishers.map(([publisher]) => publisher);
      const topPublisherCounts = sortedPublishers.map(([, count]) => count);

      setPublisherChartData({
        labels: topPublishers,
        datasets: [
          {
            label: "Books by Publisher",
            data: topPublisherCounts,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [books]);

  return publisherChartData ? <Pie data={publisherChartData} /> : <div>Loading...</div>;
};

export default BooksByPublisherChart;
