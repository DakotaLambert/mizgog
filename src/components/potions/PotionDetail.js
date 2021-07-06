import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IngredientDetail } from "../ingredients /IngredientDetail";
import { PotionContext } from "./PotionProvider";
import potDetailImage from "../../Images/potBlue.png";
import potionBackground from "../../Images/actualBook.png"
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
  
    
  
    <div className="potionDetailPageName" key={potion.id}>
          {potion.name}
    </div>

      <div className="potionDetailsContainer">

      <div className="potionNameAndIngredientDiv">
        
        <img value={potion.color} className="potionDetailImage" src={potDetailImage} />


      </div>

        <div className="potionIngredients">
          <div className="potionIngredientTitle">INGREDIENTS</div>
          <div className="test">
          {potion.potionIngredients.map((pIngredient) => (
          
           <IngredientDetail pIngredientId={pIngredient.id} key={pIngredient.id} />
          
          ))}
          </div>
        <button className="editPotionButton" onClick={() => {
          history.push(`/Books/PotionDetail/edit/${potion.id}`)
        }}>EDIT POTION</button>

        <button className="deletePotionButton" onClick={() => {
          deletePotion(potion.id)
          history.push("/Books")
        }}>DELETE POTION</button>
        

        </div>

      <img className="potionDetailBookImageDiv" src={potionBackground}/>

      

        </div> 

        <div className="potionDescription">{potion.description}</div>

        

       
      
    </>
  );
};
