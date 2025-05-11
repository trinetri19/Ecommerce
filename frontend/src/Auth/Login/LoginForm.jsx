import { useState } from 'react'
import axios from 'axios'
import './login.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom'

 const Loginform = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const handleSubmit=(e)=>{
      e.preventDefault()
      axios.post("http://localhost:8080/api/v1/login",{email,password}).then((res)=>console.log("success",res)).catch((e)=>console.log(e.message))
      navigate('/home');
    }
    return (
        <div className='f'>
            <h1> Login</h1>
            <form onSubmit={handleSubmit} className="innerForm"> 
            <div className='inp'>
                    <label htmlFor="email" id="email" >Email</label>
                    <input type="text" name="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className='inp'>
                    <label htmlFor="password" id="password" >Password</label>
                    <input placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}></input>
                </div>
                {/* <Button title="Login">Login</Button> */}
                <Button type="submit" variant="contained">Login</Button>
                <p>Not An User? Then <Link to="/register">REGISTER!</Link> </p>
            </form>
        </div>
    )
}
export default Loginform;