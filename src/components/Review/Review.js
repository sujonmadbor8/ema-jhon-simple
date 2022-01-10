import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager.js";
import ReviewItem from "../ReviewItem/ReviewItem.js";
import Cart from "../Cart/Cart.js";
import happyImage from "../../images/giphy.gif";
import { useHistory } from "react-router-dom";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory();

  const handleProceedCheckOut = () => {
    history.push("/shipment");
  };

  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    // cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch("http://localhost:5000/productBykeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((response) => response.json())
      .then((data) => setCart(data));
  }, []);

  let thankYou;
  if (orderPlaced) {
    thankYou = <img src={happyImage} alt="" />;
  }

  return (
    <div className="twinContainer">
      <div className="productContainer">
        {cart.map((pd) => (
          <ReviewItem key={pd.key} product={pd} removeProduct={removeProduct} />
        ))}
        {thankYou}
      </div>
      <div className="cartContainer">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckOut} className="mainButton">
            Proceed CheckOut
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
