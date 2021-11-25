import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ProgrammingHero1/ema-john-simple-resources/master/fakeData/products.JSON"
    )
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  // cart
  const [cart, setCart] = useState([]);

  const handleAddProduct = (product) => {
    console.log("product added", product);
    const newCart = [...cart, product];
    setCart(newCart);
  };
  return (
    <div className="shopContainer">
      <div className="productContainer">
        {products.map((product) => (
          <Product
            handleAddProduct={handleAddProduct}
            product={product}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
