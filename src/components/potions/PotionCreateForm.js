import { render } from "@testing-library/react";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BookContext } from "../books/BookProvider";
import { PotionContext } from "./PotionProvider";
import "./Potions.css"

export const PotionCreateForm = () => {

  const { addPotion } = useContext(PotionContext);
  const { books, getBooks } = useContext(BookContext);

  const [potion, setPotion] = useState({
    name: "",
    color: "",
    description: "",
    bookId: 0,
  });

  const history = useHistory()

  useEffect(() => {
    getBooks();
  }, []);

  const handleInputChange = (event) => {
    const newPotion = { ...potion };

    newPotion[event.target.id] = event.target.value;

    setPotion(newPotion);
  };

  const handleAddPotion = () => {
    

    const bookId = parseInt(potion.bookId);

    if (bookId === 0) {
      window.alert("Please select a book to add this potion to!")
    } else {
      const newPotion = {
        name: potion.name,
        color: potion.color,
        description: potion.description,
        bookId: bookId,
      }
      addPotion(newPotion).then(() => history.push(`/Books/detail/${bookId}`))
    }
  };


  return (
    <form>
        <h2 className="potionCreateHead">Create-A-Potion</h2>
      <fieldset>
        <div>
          <input
            type="text"
            id="name"
            required
            autoFocus
            placeholder="Potion Name"
            value={potion.name}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
          <input
            type="text"
            id="ingredientOne"
            required
            placeholder="Ingredient #1"
          ></input>
      </fieldset>
      <fieldset>
            <input
            type="text"
            id="ingredientOne"
            required
            placeholder="Ingredient #2"
          > 
          </input>
      </fieldset>
      <fieldset>
          <div>
              <input 
                type="color"
                id="color"
                onChange={handleInputChange}
              ></input>
          </div>
      </fieldset>
      <fieldset>
          <textarea
            type="text"
            id="description"
            required
            placeholder="Potion Description"
            value={potion.description}
            onChange={handleInputChange}
            >

          </textarea>
      </fieldset>
      <fieldset>
          <div>
              <select
                name="book"
                id="bookId"
                value={potion.bookId}
                onChange={handleInputChange}
              >
                  <option>Select a Book</option>
                    {books.map(book => 
                        <option value={book.id} key={book.id}>{book.name}</option>
                    )}
              </select>
          </div>
      </fieldset>
        <button onClick={(event) => {
            event.preventDefault()
            handleAddPotion()

        }}>Save Potion</button>
        <button onClick={() => {
            history.goBack([1])
        }}>Cancel</button>
    </form>
  );
};
