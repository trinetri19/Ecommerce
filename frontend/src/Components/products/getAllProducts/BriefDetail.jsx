import React from "react";
import {Link} from'react-router-dom'
const BriefDetail = ({ product})=>{
    return (
    <div>
      <Link to= {`/product/details/${product._id}`}><h2>{product.name}</h2></Link>
    </div>
    )
}
export default BriefDetail;