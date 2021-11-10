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

	return (
		<>
			<div className="potionIngredientDetailNames">{ingredient.name}</div>
		</>
	);
};
