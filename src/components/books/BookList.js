import React, { useContext, useEffect } from "react";
import { BookContext } from "./BookProvider";
import "./Books.css";
import bookForList from "../../Images/book1.png";

export const BookList = () => {
  const { books, getBooks } = useContext(BookContext);

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <div className="">
        <h3 className="bookListNames">
          {books.map((book) => (
            <>
              <div>
                <div>
                    {book.name}
                </div>
                <img src={bookForList} className="bookListImage" />
              </div>
            </>
          ))}
        </h3>
      </div>

      <button>Create Book</button>
    </>
  );
};
