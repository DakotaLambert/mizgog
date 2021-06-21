import React, { useContext, useEffect } from "react";
import { BookContext } from "./BookProvider";
import bookForList from "../../Images/book1.png";
import { useHistory, Link } from "react-router-dom";
import "./Books.css";

export const BookList = () => {


  // const { getBookById } = useContext(BookContext)
  const { books, getBooks } = useContext(BookContext);
  const { deleteBook } = useContext(BookContext)

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
    <div className="creatBookButtonDiv">
      <button onClick={() => history.push("/Books/create")} className="createBookButton">Create Book</button>
      </div>
        <div className="books">
          {currentUsersBooks.map((book) => (
            
              <div className="book">
                <div className="bookName">
                    {book.name}
                </div>
                <Link to={`/Books/detail/${book.id}`}><img src={bookForList} className="bookListImage" key={book.image}/></Link>
                <button className="editBookButton">Edit</button>
                <button key={book.id} value={book.id} onClick={() => {
                  deleteBook(book.id)
                }}>Delete</button>
                
              </div>
          ))}
        </div>
        
    </>
  );
};
