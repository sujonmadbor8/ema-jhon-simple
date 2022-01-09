import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager.js";
import fakeData from "../../fakeData/products.json";
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

    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
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
