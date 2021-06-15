import React, { useState, createContext} from "react"

export const BookContext = createContext()

export const BookProvider = (props) => {

    const [books, setBooks] = useState([])

    const getBooks = () => {
        return fetch("http://localhost:8088/Books")
        .then(response => response.json())
        .then(setBooks)
    }

    return (
        <BookContext.Provider value={{
            books, getBooks
        }}>
            {props.children}
        </BookContext.Provider>
    )
}