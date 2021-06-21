import React, { useState, createContext} from "react"

export const BookContext = createContext()

export const BookProvider = (props) => {

    const [books, setBooks] = useState([])

    const getBooks = () => {
        return fetch("http://localhost:8088/books?_embed=potions")
        .then(response => response.json())
        .then(setBooks)
    }

     const getBookById = (bookId) => {
         return fetch(`http://localhost:8088/books/detail/${bookId}`)
         .then(res => res.json())
     }

    const addBook = bookObj => {
        return fetch("http://localhost:8088/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookObj)
        })
        .then(getBooks)
    }

    const deleteBook = (bookId) => {
        return fetch(`http://localhost:8088/books/${bookId}`, {
            method: "DELETE"
        })
        .then(getBooks)
    }

    return (
        <BookContext.Provider value={{
            books, getBooks, addBook, deleteBook, getBookById
        }}>
            {props.children}
        </BookContext.Provider>
    )
}