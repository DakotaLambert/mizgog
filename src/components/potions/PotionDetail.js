import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IngredientDetail } from "../ingredients /IngredientDetail";
import { PotionContext } from "./PotionProvider";
import "./Potions.css";

export const PotionDetail = () => {
  const { getPotionById } = useContext(PotionContext);
  const { deletePotion } = useContext(PotionContext)
  
  const [potion, setPotion] = useState({
    potionIngredients: [],
  });

  const history = useHistory()
  const { potionId } = useParams();


  useEffect(() => {
    getPotionById(potionId)
    .then(setPotion);
  }, [potionId]);


  return (
    <>
      <section>
        <div className="potionDetailName" key={potion.id}>
          {potion.name}
        </div>
        {potion.potionIngredients.map((pIngredient) => (

          <IngredientDetail pIngredientId={pIngredient.id} key={pIngredient.id} />
         
        ))}
        <div className="potionIngredientNames">{potion.color}</div>
        <div className="potionIngredientNames">{potion.description}</div>
        <button>EDIT POTION</button>
        <button onClick={() => {
          deletePotion(potion.id)
          history.goBack([1])
        }}>DELETE POTION</button>
      </section>
    </>
  );
};
