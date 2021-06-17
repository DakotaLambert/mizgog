import React, { useState, createContext} from "react"

export const BookContext = createContext()

export const BookProvider = (props) => {

    const [books, setBooks] = useState([])

    const getBooks = () => {
        return fetch("http://localhost:8088/books?_embed=potions")
        .then(response => response.json())
        .then(setBooks)
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

    return (
        <BookContext.Provider value={{
            books, getBooks, addBook
        }}>
            {props.children}
        </BookContext.Provider>
    )
}