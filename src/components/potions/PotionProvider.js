import React, { useState, createContext } from "react"

export const PotionContext = createContext()

export const PotionProvider = (props) => {

    const [potions, setPotions] = useState([])

    const getPotions = () => {
        return fetch("http://localhost:8088/potions?_embed=potionIngredients")
        .then(response => response.json())
        .then(setPotions)
    }

    const getPotionById = (potionId) => {
        return fetch(`http://localhost:8088/potions/${potionId}?_embed=potionIngredients`)
        .then(response => response.json())
    }

    const addPotion = potionObj => {
        return fetch("http://localhost:8088/potions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(potionObj)
        })
        .then(res => res.json())
    }

    const deletePotion = (potionId) => {
        return fetch(`http://localhost:8088/potions/${potionId}`, {
            method: "DELETE"
        })
        .then(getPotions)
    }
    return (
        <PotionContext.Provider value={{
            potions, getPotions, addPotion, getPotionById, deletePotion
        }}>
            {props.children}
        </PotionContext.Provider>
    )
}