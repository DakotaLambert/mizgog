import React, { useContext, useEffect } from "react";
import { BookContext } from "./BookProvider";
import bookForList from "../../Images/book1.png";
import { useHistory, Link } from "react-router-dom";
import "./Books.css";

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

    <div className="booksPageHeader">
      Books
    </div>
        <div className="books">
          {currentUsersBooks.map((book) => (
            
              <div className="book">
                <div className="bookName">
                    {book.name}
                </div>
                <Link to={`/Books/detail/${book.id}`}><img src={bookForList} className="bookListImage" /></Link>
                <button>Edit</button>
                <button>Delete</button>
                
              </div>
              
            
          ))}
        </div>
      <button onClick={() => history.push("/Books/create")}>Create Book</button>
    </>
  );
};
