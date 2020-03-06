import React from "react";
import { Nav } from "./Nav";

export const Header = ({ isLoggedIn }) => (
  <header>
    <h1>Assel Snazell Blog</h1>
    <Nav isLoggedIn={isLoggedIn} />
  </header>
);
