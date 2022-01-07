import React from "react";

const ReviewItem = (props) => {
  console.log(props);
  const { name, quantity, key, price } = props.product;
  const reviewItemStyle = {
    borderBottom: "1px solid lightgrey",
    marginBottom: "5px",
    paddingBottom: "5px",
    marginLeft: "200px",
  };
  return (
    <div style={reviewItemStyle}>
      <h4 className="productName">{name}</h4>
      <p>
        <small>${price}</small>
      </p>
      <p>Quantity: {quantity}</p>

      <br />
      <button onClick={() => props.removeProduct(key)} className="mainButton">
        Remove
      </button>
    </div>
  );
};

export default ReviewItem;
