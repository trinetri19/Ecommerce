import react, { useState, useEffect } from 'react';
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Form = () => {
    const [createProduct, setCreateProduct] = useState({
        name: "",
        description: "",
        price: "",
        ratings: "",
        imgId: "",
        imgUrl: "",
        stock: "",
        category: "",
        numOfReviews: "",
        reviews: "",
        username: "",
        rating: "",
        comment: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCreateProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
      
       console.log(createProduct);
        axios.post("http://localhost:8080/api/v1/admin/product/new", createProduct).then((res)=>{console.log(res.data)
        }).catch((error)=>console.log(error))
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField name="name" value={createProduct.name} required label="Name" variant="standard" onChange={handleInput} className="txF" />
            <TextField name="description" value={createProduct.description} required label="Description" variant="standard" onChange={handleInput}  className="txF" />
            <TextField name="price" value={createProduct.price} required label="Price" variant="standard" onChange={handleInput} type="number"  className="txF" />
            <TextField name="ratings" value={createProduct.ratings} required label="Ratings" variant="standard" onChange={handleInput}  type="number"  className="txF"/>
            <TextField name="imgId" value={createProduct.imgId} label="Public id" variant="standard" onChange={handleInput}  className="txF" />
            <TextField name="imgUrl" value={createProduct.imgUrl} required label="URL" variant="standard" onChange={handleInput}  className="txF" />
            <TextField name="stock" value={createProduct.stock} type="number" required label="Stock" variant="standard" onChange={handleInput}  className="txF" />
            <TextField name="category" value={createProduct.category} required label="Category" variant="standard" onChange={handleInput}  className="txF" />
            <TextField name="numOfReviews" type="number" value={createProduct.numOfReviews} required label="Number of Reviews" variant="standard" onChange={handleInput}  className="txF" />
            <TextField name="rating" type="number" value={createProduct.rating} label="Rating" variant="standard" onChange={handleInput}  className="txF" />
            <TextField name="username" value={createProduct.username} label="Username" variant="standard" onChange={handleInput}  className="txF" />
            <TextField name="comment" value={createProduct.comment} label="Comment" variant="standard" onChange={handleInput}   className="txF" />
            <Button type="submit" variant="contained">Create</Button>
        </form>
    )
}

export default Form;