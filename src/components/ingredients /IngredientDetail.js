import React, { useContext, useEffect, useState } from "react";
import { IngredientContext } from "./IngredientProvider";


export const IngredientDetail = ({ pIngredientId }) => {
  const { getPotionIngredientById } = useContext(IngredientContext);

  const [ingredient, setIngredient] = useState({});

  useEffect(() => {
    getPotionIngredientById(pIngredientId).then((res) => {
      setIngredient(res.ingredient);
    });
  }, []);

  console.log(ingredient);

  return (
    <>
      <div>{ingredient.name}</div>
    </>
  );
};
