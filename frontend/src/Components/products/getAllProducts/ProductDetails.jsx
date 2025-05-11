import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // Product state

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/product/${id}`, {
      method: "GET"
    })
      .then(res =>  res.json())
      .then(data => {setProduct(data.product) 
        console.log(data.product)})
      .catch(error => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className = "PDiv">
      <img src ={product.image[0].url} height="400" width="300"></img>
      <div className='rightDiv'> 
        <span><h1>{product.category}</h1></span>
        <h2>Name: {product.name}</h2>
        <h2>Description : {product.description}</h2>
        <h2>Price : &#x20B9; {product.price}</h2>
        <Button type="submit" variant="contained">Order</Button>
        </div>
    </div>
  );
};

export default ProductDetails;
