import React, { useState, createContext } from "react";

export const IngredientContext = createContext();

export const IngredientProvider = (props) => {

  const [ingredients, setIngredients] = useState();


  const getIngredients = () => {
    return fetch("http://localhost:8088/ingredients?_embed=potionIngredients")
      .then((response) => response.json())
      .then(setIngredients);
  };


  const getPotionIngredientById = (pIngredientId) => {
    return fetch(`http://localhost:8088/potionIngredients/${pIngredientId}?_expand=ingredient`)
      .then((response) => response.json())
  };

  const addIngredient = (ingredientObj) => {
    return fetch("http://localhost:8088/ingredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredientObj),
    }).then((res) => res.json());
  };

//   const addPotionIngredient = (ingredientObj) => {
//     return fetch("http://localhost:8088/potionIngredients", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(ingredientObj),
//     }).then((response) => response.json());
//   };

  return (
    <IngredientContext.Provider
      value={{
        ingredients,
        getIngredients,
        addIngredient,
        getPotionIngredientById,
        
      }}
    >
      {props.children}
    </IngredientContext.Provider>
  );
};
