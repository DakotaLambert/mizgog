import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BookContext } from "./BookProvider";

export const BookEditForm = () => {
  const { updateBook, getBookById } = useContext(BookContext);

  const [book, setBook] = useState({
    name: "",
    userId: 0,
  });

  const history = useHistory();

  const { bookId } = useParams();

  useEffect(() => {
    if (bookId) {
      getBookById(bookId).then((book) => {
        setBook(book);
      });
    }
  }, []);

  const handleInputChange = (event) => {
    const newBook = { ...book };

    newBook[event.target.id] = event.target.value;

    setBook(newBook);
  };

  const handleUpdateBook = () => {
    const userId = parseInt(localStorage.getItem("wizard"));

    if (book.name === "") {
      window.alert("Please enter a name");
    } else {
      const changedBook = {
        id: book.id,
        name: book.name.toUpperCase(),
        userId: userId,
      };
      updateBook(changedBook).then(() => {
        history.push("/Books");
      });
    }
  };

  return (
    <form>
      <fieldset>
        <div>
          <input
            type="text"
            id="name"
            required
            autoFocus
            placeholder="Book Name"
            value={book.name}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <button
        onClick={(event) => {
          event.preventDefault();
          handleUpdateBook();
        }}
      >
        EDIT BOOK
      </button>
      <button
        onClick={(event) => {
          event.preventDefault();
          history.goBack([1]);
        }}
      >
        CANCEL
      </button>
    </form>
  );
};
