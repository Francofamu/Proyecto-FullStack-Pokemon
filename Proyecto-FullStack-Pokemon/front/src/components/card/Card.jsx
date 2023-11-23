import { Link } from "react-router-dom";
import "./card.css"

const Card = ({pokemonData}) => {
        
    const {id, name, img, types =[]} = pokemonData
   
   return (
      <div className="card-container">
         <Link className="info-link" to={`/detail/${id}`}>
            <div class="head-cards-container">
               <h1 className="card-title">{name}</h1>
               <img className="pokeball-image" src="https://i.pinimg.com/originals/e3/4f/ac/e34facd1e788d09f2bfcbc2f37f548ce.png"/>
            </div>
            <img className="card-image" src={img} alt="pokemon-image" />
            <h3 className="card-info">{types.join("  ")}</h3>     
         </Link>
      </div>
   );
}

export default Card;


