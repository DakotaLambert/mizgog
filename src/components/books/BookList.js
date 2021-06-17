import React, { useContext, useEffect } from "react";
import { BookContext } from "./BookProvider";
import "./Books.css";
import bookForList from "../../Images/book1.png";
import { useHistory } from "react-router-dom";

export const BookList = () => {
  const { books, getBooks } = useContext(BookContext);

  const currentUser = parseInt(localStorage.getItem("wizard"))
  const currentUsersBooks = books.filter(book => currentUser === book.userId)

  const history = useHistory()

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <div>
        <h3 className="bookListNames">
          {currentUsersBooks.map((book) => (
            <>
              <div>
                <div key={book.id}>
                    {book.name}
                </div>
                <img src={bookForList} className="bookListImage" />
              </div>
            </>
          ))}
        </h3>
      </div>

      <button onClick={() => history.push("/Books/create")}>Create Book</button>
    </>
  );
};
