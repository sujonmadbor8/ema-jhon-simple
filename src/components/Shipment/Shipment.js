import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import {
  getDatabaseCart,
  processOrder,
} from "../../utilities/databaseManager.js";
import "./Shipment.css";

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: data,
      orderTime: new Date(),
    };

    fetch(`https://mysterious-woodland-67668.herokuapp.com/addOrder/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          processOrder();
          alert("Your order placed successfully");
        }
      });
  };

  return (
    <form className="shipForm" onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={loggedInUser.name}
        {...register("name", { required: true })}
        placeholder="Your Name"
      />
      {errors.name && <span className="error">Name is required</span>}
      <input
        defaultValue={loggedInUser.email}
        {...register("email", { required: true })}
        placeholder="Your Email"
      />
      {errors.email && <span className="error">Email is required</span>}
      <input
        {...register("address", { required: true })}
        placeholder="Your Address"
      />
      {errors.address && <span className="error">Address is required</span>}
      <input
        {...register("phone", { required: true })}
        placeholder="Your Phone Number"
      />
      {errors.phone && <span className="error">Phone is required</span>}

      <input style={{ cursor: "pointer" }} type="submit" />
    </form>
  );
};

export default Shipment;
