import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar"
import { useDispatch } from "react-redux";
import { restore } from "../../redux/actions";
import { useLocation } from 'react-router-dom';

import "./header.css"

const Nav = () => {

    const location = useLocation();

    return(
        <div className="header">
            <div className="wrapper">

                <div className="header-logo-home">
                    <Link to="/home" className="header-button-home" onClick={useDispatch(restore)} >
                        <img src="https://cdn.worldvectorlogo.com/logos/pokemon-23.svg" alt="pokeball"/>
                    </Link>
                </div>

                {location.pathname === '/home' && <Navbar className="navbar" />}

                <div className="header-logo-create">
                    <Link to="/create" className="header-button-create">
                        <img src="https://cdn.icon-icons.com/icons2/851/PNG/512/Pokemon_Egg_icon-icons.com_67525.png" alt="pokeball"/>
                    </Link>
                </div>

            </div>
        </div>
        
    )
}

export default Nav;