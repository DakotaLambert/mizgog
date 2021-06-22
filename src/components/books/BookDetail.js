import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookContext } from "./BookProvider";
import { Link } from "react-router-dom";
import pot from "../../Images/potBlue.png";
import "../potions/Potions.css";



export const BookDetail = () => {
  
  const { getBookById } = useContext(BookContext)

  const [book, setBook] = useState({
    potions: [],
  });

  const { bookId } = useParams();

  useEffect(() => {
    getBookById(bookId)
    .then(setBook)
  }, [bookId]);

  return (
    <>
    <div className="booksPageHeader">
      POTIONS
    </div>
      <div className="potions">
        {book.potions.map((p) => (
          <div className="potion">
            <div className="potionName">
              {p.name}
            </div>
            <Link to={`/Books/PotionDetail/${p.id}`}>
              <img className="potionImage" src={pot} />
            </Link>
            
          </div>
        ))}
      </div>
    </>
  );
};
