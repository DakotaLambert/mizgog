import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookContext } from "./BookProvider";
import { Link } from "react-router-dom";
import pot from "../../Images/potBlue.png";
import "../potions/Potions.css";
// import bookDetailBackground from "../../Images/pot.jpg"

export const BookDetail = () => {
  const { getBookById } = useContext(BookContext);

  const [book, setBook] = useState({
    potions: [],
  });

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(2);

  const { bookId } = useParams();

  useEffect(() => {
    getBookById(bookId).then(setBook);
  }, [bookId]);

  const handleClickRight = () => {
    const leftCopy = left;
    const rightCopy = right;

    let leftNext = leftCopy + 2;
    let rightNext = rightCopy + 2;

    setLeft(leftNext);
    setRight(rightNext);
  };
  const handleClickLeft = () => {
    const leftCopy = left;
    const rightCopy = right;

    let leftNext = leftCopy - 2;
    let rightNext = rightCopy - 2;

    setLeft(leftNext);
    setRight(rightNext);
  };

  return (
    <>
      <style>{"body { background: `url(${})`"}</style>
      <div className="potionPageHeader">POTIONS</div>
      <div className="backgroundDetail">
        <div className="potions">
          <button
            onClick={() => {
              handleClickLeft();
            }}
          >
            ⇦
          </button>

          {book.potions.slice(left, right).map((p) => (
            <div className="potion">
              <div className="potionName">{p.name}</div>
              <Link to={`/Books/PotionDetail/${p.id}`}>
                <img className="potionImage" src={pot} />
              </Link>
            </div>
          ))}
          <button
            onClick={() => {
              handleClickRight();
            }}
            className="coolArrow"
          >
            ⇨
          </button>
        </div>
      </div>
    </>
  );
};
