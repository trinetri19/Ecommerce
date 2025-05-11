import { useState } from 'react'
import axios from 'axios'
import './register.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';

 const RegisterForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8080/api/v1/register", { email, username, password }).then((res) => console.log("succes", res)).catch((e) => console.log(e.message))
        navigate('/home')
    }
    return (
        <div className='R'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className='innerRForm'>
                <div className='inp'>
                    <label htmlFor="email" id="email" >Email</label>
                    <input type="text" name="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className='inp'>
                    <label htmlFor="username" id="username" >Username</label>
                    <input type="text" name="username" placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div className='inp'>
                    <label htmlFor="password" id="password" >Password</label>
                    <input placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                {/* <Button title="register"></Button> */}
                <Button type="submit" variant="contained">Register</Button>
            </form>
            <p>Already An User? Then <Link to="/login">Login here!</Link> </p>
        </div>
    )
}
export default RegisterForm;