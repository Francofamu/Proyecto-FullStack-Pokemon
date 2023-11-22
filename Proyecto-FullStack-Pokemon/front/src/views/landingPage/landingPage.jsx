import { Link } from "react-router-dom";
import "./landingPage.css"

const LandingPage = () => {

    return (
        <div className="landing-page-image">
            <div className="landing-page-container">
                <Link to="/home">
                    <button className="landing-page-button"> Pokemon Go! </button>
                </Link>
            </div>
        </div>
    );
}

export default LandingPage  ;
