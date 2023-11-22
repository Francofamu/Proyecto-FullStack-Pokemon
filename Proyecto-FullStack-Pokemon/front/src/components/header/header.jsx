import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./header.css"

const Nav = () => {

    const handleHomeClick = () => {
        // useDispatch(cleanFilteredDogs())
    }
    
    return(
        <div className="header">
            <div className="wrapper">

                <div className="header-logo-home">
                    <Link to="/home" className="header-button-home" onClick={handleHomeClick}>
                        <img src="https://cdn.worldvectorlogo.com/logos/pokemon-23.svg" alt="pokeball"/>
                    </Link>
                </div>

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