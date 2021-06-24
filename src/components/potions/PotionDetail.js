import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IngredientDetail } from "../ingredients /IngredientDetail";
import { PotionContext } from "./PotionProvider";
import potDetailImage from "../../Images/potBlue.png";
import potionBackground from "../../Images/potionBackgroundForrealThisTime.png"
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

  // const sectionStyle = {
  //     backgroundImage: `url(${potionBackground})`,
  //     backgroundRepeat: 'no-repeat',
  //     backgroundAttachment: 'fixed',
  //     backgroundPosition: 'top',
  //     backgroundSize: 'cover',
  //     height: "1000px"
  // }

  return (
    <>

    <div style={{
      backgroundImage: `url(${potionBackground})`,
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'top',
      backgroundSize: '2000px'
    }}>

    <div className="potionDetailPageName" key={potion.id}>
          {potion.name}
    </div>

      <div className="potionDetailsContainer">

      

      <div className="potionNameAndIngredientDiv">
        

        <div className="potionColor">{potion.color}</div>
        <img className="potionDetailImage" src={potDetailImage} />


      </div>

        <div className="potionIngredients">
          <div className="potionIngredientTitle">INGREDIENTS</div>
          {potion.potionIngredients.map((pIngredient) => (
          
           <IngredientDetail pIngredientId={pIngredient.id} key={pIngredient.id} />
          
          ))}
        
        <button onClick={() => {
          history.push(`/Books/PotionDetail/edit/${potion.id}`)
        }}>EDIT POTION</button>

        <button onClick={() => {
          deletePotion(potion.id)
          history.goBack([1])
        }}>DELETE POTION</button>
        {/* <button onClick={() => {
          history.goBack([1])
        }}>BACK TO POTIONS</button> */}

        </div>

      

      

        </div> 

        <div className="potionDescription">{potion.description}</div>

        

       
      </div>
    </>
  );
};
