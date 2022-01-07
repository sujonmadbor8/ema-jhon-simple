import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager.js";
import fakeData from "../../fakeData/products.json";
import ReviewItem from "../ReviewItem/ReviewItem.js";
import Cart from "../Cart/Cart.js";

const Review = () => {
  const [cart, setCart] = useState([]);

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

  return (
    <div className="twinContainer">
      <div className="productContainer">
        {cart.map((pd) => (
          <ReviewItem key={pd.key} product={pd} removeProduct={removeProduct} />
        ))}
      </div>
      <div className="cartContainer">
        <Cart cart={cart}>
          <button className="mainButton">Place Order</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
