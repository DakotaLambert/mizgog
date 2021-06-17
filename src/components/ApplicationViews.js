import React from "react";
import { Route } from "react-router-dom";
import { MizgogInfo } from "./MizgogInfo";
import { BookList } from "./books/BookList";
import { BookProvider } from "./books/BookProvider";
import { BookCreateForm } from "./books/BookCreateForm";
import { PotionProvider } from "./potions/PotionProvider";
import { PotionCreateForm } from "./potions/PotionCreateForm";


export const ApplicationViews = () => {

    return (

        <>

            <Route exact path="/">
                <MizgogInfo />
            </Route>

            <BookProvider>
            <Route exact path="/Books">
                <BookList />
            </Route>

            <Route exact path="/Books/create">
                <BookCreateForm />
            </Route>
            </BookProvider>

            <PotionProvider>
                <BookProvider>
                    <Route exact path="/Create-A-Potion">
                        <PotionCreateForm />
                    </Route>
                </BookProvider>
            </PotionProvider>
        </>

    )

}