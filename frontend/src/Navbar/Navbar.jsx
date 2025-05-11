import react from 'react'
import Heading from './Heading'
import AccountCir from './AccountCir'
import NavComponents from "./NavComponents"
import { useState } from "react";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";

import './navbar.css'


 

 const Navbar = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
        <div className="main-nav">
                <Heading ></Heading>
            <div className='nav-right'>
               <NavComponents ></NavComponents>
                   <IconButton onClick={handleClick} className="cir">
                   <Avatar alt="A" src="/avatar.jpg" />
                    </IconButton>

                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                 </div>
        </div>
    )
}

export default Navbar;