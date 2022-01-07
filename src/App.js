import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import NotFound from "./components/NotFound/NotFound";
import ProductDetails from "./components/ProductDetails/ProductDetails";

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/shop">
            <Shop></Shop>
          </Route>
          <Route exact path="/review">
            <Review></Review>
          </Route>
          <Route exact path="/inventory">
            <Inventory />
          </Route>
          <Router exact path="/">
            <Shop />
          </Router>
          <Route path="/product/:productKey">
            <ProductDetails />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
