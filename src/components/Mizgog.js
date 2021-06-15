import React from "react";
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";
// import { Route, Redirect } from "react-router-dom";
// import { ApplicationViews } from "./ApplicationViews";
// import { Login } from "./auth/Login";
// import { Register } from "./auth/Register";
import "./Mizgog.css"

export const Mizgog = () => (
  <>
  <NavBar />
    <div>
      <h1 className="mizgogPageHeader">Mizgogs M'accoutrements</h1>
    </div>
    <ApplicationViews />
  </>
)