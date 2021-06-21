import React from "react";
import { Route } from "react-router-dom";
import { MizgogInfo } from "./MizgogInfo";
import { BookList } from "./books/BookList";
import { BookProvider } from "./books/BookProvider";
import { BookCreateForm } from "./books/BookCreateForm";
import { BookDetail } from "./books/BookDetail";
import { PotionProvider } from "./potions/PotionProvider";
import { PotionCreateForm } from "./potions/PotionCreateForm";
import { PotionDetail } from "./potions/PotionDetail";
import { IngredientProvider } from "./ingredients /IngredientProvider";

export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/">
        <MizgogInfo />
      </Route>

      <BookProvider>
        <PotionProvider>
          <Route exact path="/Books">
            <BookList />
          </Route>

          <Route exact path="/Books/create">
            <BookCreateForm />
          </Route>
          <Route exact path="/Books/detail/:bookId(\d+)">
            <BookDetail />
          </Route>
          <IngredientProvider>
            <Route exact path="/Books/PotionDetail/:potionId(\d+)">
              <PotionDetail />
            </Route>
          </IngredientProvider>
        </PotionProvider>
      </BookProvider>

      <PotionProvider>
        <BookProvider>
          <IngredientProvider>
            <Route exact path="/Create-A-Potion">
              <PotionCreateForm />
            </Route>
          </IngredientProvider>
        </BookProvider>
      </PotionProvider>



    </>
  );
};
