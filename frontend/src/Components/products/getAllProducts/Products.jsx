import react , {useState,useEffect} from 'react';
import ProductImage from './ProductImage.jsx'
import BriefDetail from './BriefDetail.jsx'
import "./product.css"
import {Link} from 'react-router-dom'
  

const Products = ()=>{
    const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/products", {
      method: "GET"
    })
      .then(res => res.json()
     )
      .then(data => {
        setProducts(data.products);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);

return (
    <div className="productDiv">
      
       {products.map(product =>(
            <div key={product._id} className="PsDiv" >
            <ProductImage product = {product.image}></ProductImage>
            <BriefDetail product = {product}></BriefDetail>
            </div>
        ))} 
    
    </div>
)
}
export default Products;