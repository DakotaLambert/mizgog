import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { BookContext } from "./BookProvider";
import bookage from "../../Images/book1.png";

export const BookCreateForm = () => {
  const { addBook } = useContext(BookContext);

  const [book, setBook] = useState({
    name: "",
    userId: 0,
  });

  const history = useHistory();

  const handleInputChange = (event) => {
    const newBook = { ...book };

    newBook[event.target.id] = event.target.value;

    setBook(newBook);
  };

  const handleAddBook = () => {
    const userId = parseInt(localStorage.getItem("wizard"));

    if (book.name === "") {
      window.alert("Please enter a book name");
    } else {
      const newBook = {
        name: book.name.toUpperCase(),
        userId: userId,
      };
      addBook(newBook).then(() => {
        history.push("/Books");
      });
    }
  };

  return (
    <>
      <div className="bookCreatePageName">CREATE-A-BOOK</div>
      <form className="bookFormContainer">
        <fieldset>
          <div className="bookFormBox">
            <input
              type="text"
              id="name"
              className="bookFormField"
              required
              autoFocus
              placeholder="Book Name"
              value={book.name}
              onChange={handleInputChange}
            />
          </div>
        </fieldset>

        <div className="bookCreateImageDiv">
          <img className="bookCreateImage" src={bookage} />
        </div>

        <div className="bookCreateButtonDiv">
          <button
            onClick={(event) => {
              event.preventDefault();
              handleAddBook();
            }}
          >
            Save Book
          </button>
          <button
            onClick={() => {
              history.goBack([1]);
            }}
          >
            CANCEL
          </button>
        </div>
      </form>
    </>
  );
};
