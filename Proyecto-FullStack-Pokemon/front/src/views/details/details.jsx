import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails, cleanDetail } from "../../redux/actions";
import Header from "../../components/header/header";
import "./details.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemonDetail = useSelector((state) => state.details);

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

  return (
    <div>
      <Header />
      <div className="container">
        <div className="image-container">
          <img
            className="card-image-detail"
            src={pokemonDetail[0].img}
            alt=""
          />
        </div>
        <div className="information-container">
          <h2 className="id">{pokemonDetail[0].id}</h2>
          <h1 className="detail-name">{pokemonDetail[0].name}</h1>
          <h3 className="detail-name">HP: {pokemonDetail[0].hp}</h3>
          <h3 className="detail-name">Attack: {pokemonDetail[0].attack}</h3>
          <h3 className="detail-name">Defense: {pokemonDetail[0].defense}</h3>
          <h3 className="detail-name">Speed: {pokemonDetail[0].speed}</h3>
          <h3 className="detail-name">Height: {pokemonDetail[0].height}</h3>
          <h3 className="detail-name">Weight: {pokemonDetail[0].weight}</h3>
          <h3 className="detail-info">Types: {pokemonDetail[0].types}</h3>
        </div>
      </div>
    </div>
  );
};

export default Detail;
