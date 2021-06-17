import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookContext } from "./BookProvider";
// import { PotionContext } from "../potions/PotionProvider";

export const BookDetail = () => {
  const { books } = useContext(BookContext);
  // const {potions} = useContext(PotionContext)

  const [book, setBook] = useState({
    potions: [],
    potionIngredients: [],
  });

  const { bookId } = useParams();

  useEffect(() => {
    const thisBook = books.find((book) => book.id === parseInt(bookId)) || {
      potion: {},
    };
    setBook(thisBook);
  }, [bookId]);

  return (
    <>
      <section>
        {book.potions.map((p) => 
          <div className="bookDetailPotionName">{p.name}</div>
        )}
      </section>
    </>
  );
};
