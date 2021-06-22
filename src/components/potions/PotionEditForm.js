import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BookContext } from "../books/BookProvider";
import { IngredientContext } from "../ingredients /IngredientProvider";
import { PotionContext } from "./PotionProvider";
import "./Potions.css";

export const PotionCreateForm = () => {
  const { addPotion } = useContext(PotionContext);
  const { books, getBooks } = useContext(BookContext);
  const { addIngredient, addPotionIngredient } = useContext(IngredientContext);
  const history = useHistory();

  const [potion, setPotion] = useState({
    name: "",
    color: "",
    description: "",
    bookId: 0,
  });

  const [ingredient, setIngredient] = useState({
    name: "",
  });

  const [ingredientTwo, setIngredientTwo] = useState({
    name: "",
  });


  useEffect(() => {
    getBooks();
  }, []);

  const handleInputChange = (event) => {
    const newPotion = { ...potion };

    newPotion[event.target.id] = event.target.value;

    setPotion(newPotion);
  };

  const handleIngredientInputChange = (event) => {
    const newIngredient = { ...ingredient };

    newIngredient[event.target.id] = event.target.value;

    setIngredient(newIngredient);
  };

  const handleIngredientTwoInputChange = (event) => {
    const newIngredientTwo = { ...ingredientTwo };

    newIngredientTwo[event.target.id] = event.target.value;

    setIngredientTwo(newIngredientTwo);
  };

  const handleAddPotion = () => {
    const bookId = parseInt(potion.bookId);

    if (bookId === 0) {
      window.alert("Please select a book to add this potion to!");
    } else {
      const newPotion = {
        name: potion.name.toUpperCase(),
        color: potion.color,
        description: potion.description,
        bookId: bookId,
      };
      addPotion(newPotion).then((createdPotion) => {
        if (createdPotion.hasOwnProperty("id")) {
          addIngredient(ingredient)
          .then((ingredientOne) => {
            addIngredient(ingredientTwo)
            .then((createdIngredientTwo) => {
              addPotionIngredient({
                potionId: createdPotion.id,
                ingredientId: ingredientOne.id,
              })
              .then(() => {
                console.log("Adding last ingredient relationship");
                addPotionIngredient({
                  potionId: createdPotion.id,
                  ingredientId: createdIngredientTwo.id,
                })
                .then(() => {
                  console.log("History push");
                  history.push(`/Books/detail/${bookId}`);
                });
              });
            });
          });
        }
      });
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
          id="name"
          required
          placeholder="Ingredient #1"
          value={ingredient.name}
          onChange={handleIngredientInputChange}
        ></input>
      </fieldset>
      <fieldset>
        <input
          type="text"
          id="name"
          required
          placeholder="Ingredient #2"
          value={ingredientTwo.name}
          onChange={handleIngredientTwoInputChange}
        ></input>
      </fieldset>
      <fieldset>
        <div>
          <input type="color" id="color" onChange={handleInputChange}></input>
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
        ></textarea>
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
            {books.map((book) => (
              <option value={book.id} key={book.id}>
                {book.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button
        onClick={(event) => {
          event.preventDefault();
          handleAddPotion();
        }}
      >
        Save Potion
      </button>
      <button
        onClick={(event) => {
          event.preventDefault();
          history.goBack([1]);
        }}
      >
        Cancel
      </button>
    </form>
  );
};
