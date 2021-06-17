import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import wizard from "../../Images/weezardGreen.png"
import book from "../../Images/book1.png"
import create from "../../Images/brewboi.png"
import door from "../../Images/logoutDoor.png"

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link homeLink" to="/"><img src={wizard} className="wizardButton"/></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/Books"><img src={book} className="bookButton"/></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/Create-A-Potion"><img src={create} className="createButton"/></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/login" onClick={() => {
                    localStorage.removeItem("wizard")
                }}>
                    <img src={door} className="logoutButton" />
                </Link>
            </li>
        </ul>
    )
}