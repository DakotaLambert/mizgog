import React from "react";
import { Route } from "react-router-dom";
import { MizgogInfo } from "./MizgogInfo";
import { BookList } from "./books/BookList";
import { BookProvider } from "./books/BookProvider";
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
            </BookProvider>
        </>

    )

}