import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails, cleanDetail} from "../../redux/actions";
import Header from "../../components/header/header";
import "./details.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const allPokemons = useSelector((state) => state.allPokemons);
  const pokemonDetail = useSelector((state) => state.details);
  const pokemonEvolutions = useSelector((state) => state.evolutions);

  useEffect(() => {
    dispatch(getDetails(id));
    return () => {
      dispatch(cleanDetail())
    };
  }, [dispatch, id]);


  // Verificar si pokemonDetail está definido y tiene elementos
  if (!pokemonDetail || pokemonDetail.length === 0) {
    return <div>Loading...</div>; // o cualquier otro mensaje de carga o manejo de error
  }
  
  const evolutionRequest = pokemonEvolutions.find(pokemon => pokemon.name === pokemonDetail[0].name)?.evolutionName;

  let evolutionImage;
  let evolutionId;

  if (evolutionRequest) {
    evolutionImage = allPokemons.find(pokemon => pokemon.name === evolutionRequest)?.img;
    evolutionId = allPokemons.find(pokemon => pokemon.name === evolutionRequest)?.id;
  }

  return (
    <div>
      <Header />
      <div className="card-container-detail">
        <div className="head-detail-container">  
          <h2 className="id-detail">#{pokemonDetail[0].id}</h2>
          <h1 className="name-detail-container">{pokemonDetail[0].name}</h1>
          <img className="pokeball-image-container" src="https://i.pinimg.com/originals/e3/4f/ac/e34facd1e788d09f2bfcbc2f37f548ce.png"/>
        </div>
        <div className="image-container-detail">
        {evolutionImage ? 
        <Link to={`/detail/${evolutionId}`}>
        <img className="evolution-image" src={evolutionImage} alt="Evolution" />
        </Link>
        : <div>
          <br/>
          <br/>
          <br/>
          </div>}
          <img
            className="card-image-detail"
            src={pokemonDetail[0].img}
            alt=""
          />
        </div>
          <h3 className="detail-types">{pokemonDetail[0].types.join("  ")}</h3>
        <div className="information-container-detail">
          <h3 className="detail-info">HP: {pokemonDetail[0].hp}</h3>
          <h3 className="detail-info">Speed: {pokemonDetail[0].speed}</h3>
          <h3 className="detail-info">Attack: {pokemonDetail[0].attack}</h3>
          <h3 className="detail-info">Defense: {pokemonDetail[0].defense}</h3>
        </div>
        <div className="information-container-detail-2">
          <h3 className="detail-info">Height: {pokemonDetail[0].height}</h3>
          <h3 className="detail-info">Weight: {pokemonDetail[0].weight}</h3>
        </div>
      </div>
    </div>
  );
};

export default Detail;
