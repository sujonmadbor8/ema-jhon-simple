import React from "react";
import { useParams } from "react-router-dom";
import fakeData from "../../fakeData/products.json";
import Product from "../Product/Product";

const ProductDetails = () => {
  const { productKey } = useParams();
  const product = fakeData.find((pd) => pd.key === productKey);
  console.log(product);
  return (
    <div>
      <h2>Your Product Details</h2>
      <Product showAddToCart={false} product={product} />
    </div>
  );
};

export default ProductDetails;
