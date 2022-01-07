import React, { useReducer } from "react";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const cart = props.cart;
  // console.log(cart);
  //   const totalPrice = cart.reduce((total, product) => total + product.price, 0);
  let total = 0;
  cart.forEach((product) => (total += product.price));
  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.99;
  } else if (total > 0) {
    shipping = 12.99;
  }
  const tax = total * 0.1;

  const formateNumber = (num) => {
    const pricision = num.toFixed(2);
    return Number(pricision);
  };
  return (
    <div>
      <h5>Order Summary: </h5>
      <p>Items Ordered: {cart.length}</p>
      <p>
        <small>Shipping Cost: {formateNumber(shipping)}</small>
      </p>
      <p>
        <small>Tax + VAT: {formateNumber(tax)}</small>
      </p>
      <p>Total Price: {formateNumber(total + shipping + tax)}</p>
      <br />
      <Link to="/review">
        <button className="mainButton">Review Order</button>
      </Link>
    </div>
  );
};

export default Cart;
