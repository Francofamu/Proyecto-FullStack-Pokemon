import { Link } from "react-router-dom";
import "./card.css"

const Card = ({pokemonData}) => {
        
    const {id, name, img, types =[]} = pokemonData
   
   return (
      <div className="card-container">
         <Link className="info-link" to={`/detail/${id}`}>
            <img className="card-image" src={img} alt="" />
            <h1 className="card-title">{name}</h1>
            <h3 className="card-info">{types.join(", ")}</h3>     
         </Link>
      </div>
   );
}

export default Card;


