import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IngredientDetail } from "../ingredients /IngredientDetail";
import { PotionContext } from "./PotionProvider";
import "./Potions.css";

export const PotionDetail = () => {
  const { potions } = useContext(PotionContext);

  
  const [potion, setPotion] = useState({
    potionIngredients: [],
  });


  const { potionId } = useParams();


  useEffect(() => {
    const thisPotion = potions.find(
      (potion) => potion.id === parseInt(potionId)
    );
    setPotion(thisPotion);
  }, [potionId]);


  return (
    <>
      <section>
        <div className="potionDetailName">
          {potion.name}
        </div>
        {potion.potionIngredients.map((pIngredient) => (

          <IngredientDetail pIngredientId={pIngredient.id} key={pIngredient.id}/>
         
        ))}
      </section>
    </>
  );
};
