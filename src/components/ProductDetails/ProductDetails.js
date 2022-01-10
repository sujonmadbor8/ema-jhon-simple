import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

const ProductDetails = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch("https://mysterious-woodland-67668.herokuapp.com/" + productKey)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [productKey]);

  // const product = fakeData.find((pd) => pd.key === productKey);

  return (
    <div>
      <h2>Your Product Details</h2>
      <Product showAddToCart={false} product={product} />
    </div>
  );
};

export default ProductDetails;
