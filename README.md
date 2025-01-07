# Next.js Books Dashboard

This project is a **Books Dashboard** built with **Next.js**, **React**, and **Chart.js**. The app allows users to view, search, and filter books, and visualize the distribution of books by publisher through a pie chart.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The application displays a list of books along with their details (e.g., title, author, publisher, and status). It provides search functionality and allows users to filter books by status (Read, Reading, Not Read). Additionally, it includes a pie chart that shows the distribution of books by publisher.

Key features include:
- **Search and filter functionality** for books.
- **Status management** (Read, Reading, Not Read).
- **Pie chart visualization** showing books by publisher using Chart.js.
- **Infinite scrolling** for pagination of book data.

## Tech Stack

- **Next.js**: Framework for building the application.
- **React**: JavaScript library for building user interfaces.
- **Chart.js**: Charting library used for rendering pie charts.
- **Cypress**: Testing framework for end-to-end testing.
- **franc-min**: Language detection library.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Architecture Overview

This application follows a simple **client-server architecture**:

1. **Frontend**: 
   - The user interface is built with **React** and **Next.js**. 
   - The state is managed using React’s **useState** and **useEffect** hooks, with data from a JSON file representing the books.
   - A **pie chart** is rendered using **Chart.js** to show the distribution of books by publisher.
   
2. **Backend**:
   - No server-side data processing is implemented in this project, but data is fetched directly from a **local JSON file** (`books.json`).

### Component Structure:
- **HomePage**: Main page of the application containing the book list, search bar, filter, and pie chart.
- **BooksByPublisherChart**: Component for displaying the pie chart of books grouped by publisher.
- **BooksTable**: Displays books in a table format with pagination and status management.

### Data Flow:
1. **Books** are loaded from `books.json` when the component mounts (`useEffect`).
2. The **book statuses** are initialized based on data from `localStorage` or default values.
3. **Filtering** and **search** are done client-side, using the `franc` library to detect language and local state for status.
4. The **pie chart** data is computed using the `reduce` method to count the number of books per publisher.

## Features

- **Search by Title or Author**: Allows users to filter books based on the title or author name.
- **Filter by Status**: Users can filter books based on their reading status (Read, Reading, Not Read).
- **Pie Chart**: Displays a pie chart of the top 5 publishers and their book count using **Chart.js**.
- **Pagination**: Supports paginated display of books with infinite scrolling.
- **Persistent Status**: The status of each book is saved in **localStorage**.

## Setup and Installation

Follow the steps below to set up and run the project locally:

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version >=14.x)
- **npm** (or **yarn**)

### Installation

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/your-username/books-dashboard.git
    ```

2. Navigate into the project directory:
    ```bash
    cd books-dashboard
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

    Or, if you're using **yarn**:
    ```bash
    yarn install
    ```

### Running the Development Server

To start the development server, run:
```bash
npm run dev

<<<<<<< HEAD
### Usage

Once the app is running, you will see a dashboard displaying books with the following functionality:

- **Search Bar**: Filter books by title or author.
- **Status Filter Dropdown**: Filter books based on their status (e.g., Read, Reading, Not Read).
- **Books Table**: Display book details such as title, author, and publisher.
- **Pie Chart**: Visualize the distribution of books by publisher.
- **Pagination Controls**: Navigate through the list of books.

### Book Status Management

Click on the status of a book (e.g., "Not Read", "Reading", or "Read") to toggle between these statuses. The status is persisted in **localStorage** so that the status persists even after a page reload.

## Testing

This project uses **Cypress** for end-to-end testing. To run the tests:

1. Install Cypress if you haven’t already:
    ```bash
    npm install cypress --save-dev
    ```

2. Open Cypress:
    ```bash
    npx cypress open
    ```

=======
````

### Usage

Once the app is running, you will see a dashboard displaying books with the following functionality:

- **Search Bar**: Filter books by title or author.
- **Status Filter Dropdown**: Filter books based on their status (e.g., Read, Reading, Not Read).
- **Books Table**: Display book details such as title, author, and publisher.
- **Pie Chart**: Visualize the distribution of books by publisher.
- **Pagination Controls**: Navigate through the list of books.

### Book Status Management

Click on the status of a book (e.g., "Not Read", "Reading", or "Read") to toggle between these statuses. The status is persisted in **localStorage** so that the status persists even after a page reload.

## Testing

This project uses **Cypress** for end-to-end testing. To run the tests:

1. Install Cypress if you haven’t already:
    ```bash
    npm install cypress --save-dev
    ```

2. Open Cypress:
    ```bash
    npx cypress open
    ```

>>>>>>> e1efacb (cypress test)
3. Run the tests in the Cypress UI that opens.

This README file includes:
- A project overview and the key features of your app.
- Setup and installation instructions for developers.
- Information about the tech stack and architecture of the app.
- Testing instructions using Cypress.
- Contribution guidelines and license details.

Feel free to modify the file as needed based on your specific setup and additional features.