import react from 'react'
import './home.css'
import Products from "../products/getAllProducts/Products"
const Home = ()=>{
    return (
    <div className='hero'>
        <Products></Products>
    </div>
    )
}
export default Home;