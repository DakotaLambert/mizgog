import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BookContext } from "../books/BookProvider";
import { IngredientContext } from "../ingredients /IngredientProvider";
import { PotionContext } from "./PotionProvider";
import "./Potions.css";

export const PotionEditForm = () => {
  const { books } = useContext(BookContext);
  const { getPotionById } = useContext(PotionContext);
  const { getBooks } = useContext(BookContext);
  const { getIngredientById } = useContext(IngredientContext);
  const { updatePotion } = useContext(PotionContext);
  const { updateIngredient } = useContext(IngredientContext);

  const currentUser = parseInt(localStorage.getItem("wizard"))
  const currentUsersBooks = books.filter(book => currentUser === book.userId)

  const history = useHistory();

  const [potion, setPotion] = useState({
    name: "",
    color: "",
    description: "",
    bookId: 0,
    potionIngredients: [],
  });

  const [ingredient, setIngredient] = useState({
    name: "",
  });

  const [ingredientTwo, setIngredientTwo] = useState({
    name: "",
  });

  const { potionId } = useParams();

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    getPotionById(parseInt(potionId))
    .then((potion) => {
      setPotion(potion);
      const ingred = potion.potionIngredients[0];
      const ingredTwo = potion.potionIngredients[1];

      if (ingred) {
        getIngredientById(ingred.ingredientId).then((ingredientOne) => {
          setIngredient(ingredientOne);
        });
      }
      if (ingredTwo) {
        getIngredientById(ingredTwo.ingredientId).then((ingredientTwo) => {
          setIngredientTwo(ingredientTwo);
        });
      }
    });
  }, []);


  const handleUpdatePotion = () => {
    
    const updatedPotion = {
      id: potion.id,
      name: potion.name.toUpperCase(),
      color: potion.color,
      description: potion.description,
      bookId: parseInt(potion.bookId),
    };

    const updatedIngredient = {
      id: ingredient.id,
      name: ingredient.name,
    };

    const updatedIngredientTwo = {
      id: ingredientTwo.id,
      name: ingredientTwo.name,
    };

    updatePotion(updatedPotion)
      .then(() => {
        updateIngredient(updatedIngredient);
        updateIngredient(updatedIngredientTwo);
      })
      .then(() => {
        history.push(`/Books/PotionDetail/${potion.id}`);
      });
  };

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

  return (
    <form>
      <h2 className="potionCreateHead">Edit-A-Potion</h2>
      <fieldset>
        <div className="potionFormBox">
          <input
            type="text"
            id="name"
            className="potionFormField"
            required
            autoFocus
            placeholder="Potion Name"
            value={potion.name}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset className="potionFormBox">
        <input
          type="text"
          id="name"
          className="potionFormField"
          required
          placeholder="Ingredient #1"
          value={ingredient.name}
          onChange={handleIngredientInputChange}
        ></input>
      </fieldset>
      <fieldset className="potionFormBox">
        <input
          type="text"
          id="name"
          className="potionFormField"
          required
          placeholder="Ingredient #2"
          value={ingredientTwo.name}
          onChange={handleIngredientTwoInputChange}
        ></input>
      </fieldset>
      <fieldset className="potionFormBox">
        <div className="potionColorFieldDiv">
          <input className="potionColorField" type="color" id="color" onChange={handleInputChange}></input>
        </div>
      </fieldset>
      <fieldset className="potionFormBox">
        <textarea
          type="text"
          id="description"
          className="potionFormField"
          required
          rows="4"
          cols="10"
          placeholder="Potion Description"
          value={potion.description}
          onChange={handleInputChange}
        ></textarea>
      </fieldset>
      <fieldset className="potionFormBox">
        <div className="potionColorFieldDiv">
          <select
            name="book"
            className="potionColorField"
            id="bookId"
            value={potion.bookId}
            onChange={handleInputChange}
          >
            <option>Select a Book</option>
            {currentUsersBooks.map((book) => (
              <option value={book.id} key={book.id}>
                {book.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <div className="potionCreateButtonDiv">
      <button
        onClick={(event) => {
          event.preventDefault();
          handleUpdatePotion();
        }}
      >
        EDIT POTION
      </button>
      <button
        onClick={(event) => {
          event.preventDefault();
          history.push(`/Books/PotionDetail/${potion.id}`);
        }}
      >
        CANCEL
      </button>
      </div>
    </form>
  );
};
