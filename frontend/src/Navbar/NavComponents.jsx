import react from 'react'
import {Link} from 'react-router-dom';
 const NavComponents = ()=>{
    return (
        <div className='comp-div'>
            <ul>
        <li><Link to="/home" className='l'>Base</Link></li>
        <li><Link to="/shopzone" className='l'>ShopZone</Link></li>
        <li><Link to="/hotpicks" className='l'>HotPicks</Link></li>
        <li><Link to="/dealVault" className='l'>DealsVault</Link></li>
        <li><Link to="/Orders" className='l'>Orders</Link></li>
            </ul>
        </div>
    )
}
export default NavComponents;