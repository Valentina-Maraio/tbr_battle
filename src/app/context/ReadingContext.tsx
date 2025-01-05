'use client'

import React, { createContext, useState, useContext, useEffect } from "react";

interface Book {
    Book_Id: string;
    Title: string;
    Author: string;
}

interface FavoriteContextType {
    favoriteBooks: Book[];
    bookStatuses: { [key: string]: string };
    addFavorite: (book: Book) => void;
    removeFavorite: (bookId: string) => void;
    toggleBookStatus: (bookId: string) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
    const [bookStatuses, setBookStatuses] = useState<{ [key: string]: string }>({});

    // Load favorite books from localStorage
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favoriteBooks");
        if (storedFavorites) {
            setFavoriteBooks(JSON.parse(storedFavorites));
        }

        const storedStatuses = localStorage.getItem("bookStatuses");
        if (storedStatuses) {
            setBookStatuses(JSON.parse(storedStatuses));
        }
    }, []);

    // Save to localStorage when favoriteBooks or bookStatuses change
    useEffect(() => {
        if (favoriteBooks.length > 0) {
            localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
        }
        if (Object.keys(bookStatuses).length > 0) {
            localStorage.setItem("bookStatuses", JSON.stringify(bookStatuses));
        }
    }, [favoriteBooks, bookStatuses]);

    const addFavorite = (book: Book) => {
        // Prevent adding the same book twice
        setFavoriteBooks((prev) => {
            if (!prev.find((existingBook) => existingBook.Book_Id === book.Book_Id)) {
                return [...prev, book];
            }
            return prev; // Book is already in the list, so don't add again
        });
    };

    const removeFavorite = (bookId: string) => {
        setFavoriteBooks((prevBooks) => prevBooks.filter((book) => book.Book_Id !== bookId));
    };

    const toggleBookStatus = (bookId: string) => {
        setBookStatuses((prevStatuses) => {
            const currentStatus = prevStatuses[bookId];
            let newStatus = currentStatus === "Not Read" ? "Reading" : currentStatus === "Reading" ? "Read" : "Not Read";

            return { ...prevStatuses, [bookId]: newStatus };
        });
    };

    return (
        <FavoriteContext.Provider
            value={{
                favoriteBooks,
                bookStatuses,
                addFavorite,
                removeFavorite,
                toggleBookStatus
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};

// Custom hook for consuming the context
export const useFavorite = (): FavoriteContextType => {
    const context = useContext(FavoriteContext);
    if (!context) {
        throw new Error("useFavorite must be used within a FavoriteProvider");
    }
    return context;
};
