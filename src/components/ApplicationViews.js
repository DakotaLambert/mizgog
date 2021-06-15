import React from "react";
import { Route } from "react-router-dom";
import { MizgogInfo } from "./MizgogInfo";

export const ApplicationViews = () => {

    return (

        <>

            <Route exact path="/">
                <MizgogInfo />
            </Route>

        </>

    )

}