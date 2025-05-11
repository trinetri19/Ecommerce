import React from "react";


const ProductImage = ({product})=>{
    return(
    <div>
          {
                   product.map(img =>(
                    <img src={img.url} height={300} width={250}></img>
                   ))   
         }
    </div>
    )
}
export default ProductImage;