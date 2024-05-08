import React from "react";
import { Switch, Route } from "react-router-dom";

import { getStatus } from "./utils/auth";
import Navbar from "./components/Navbar";

import NotFound from "./views/NotFound";
import Transaksi from "./views/Transaksi";
import Login from "./views/Login";
import Order from "./views/Order"
import Menu from "./views/Menu";
import Cart from "./views/Cart";

const App = () => {
  const status = getStatus();

  if (status.isLoggedIn) {
    return (
      <>
        <Navbar isLoggedIn />
        <Switch>
          <Route exact path="/Menu">
            <Menu />
          </Route>
          <Route path="/transaksi">
            <Transaksi />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route path="/">
            <Order />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </>
    );
  }
};

export default App;
