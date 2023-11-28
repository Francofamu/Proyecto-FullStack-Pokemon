import { useEffect } from "react";
import {  useSelector } from "react-redux";
import "./pagination.css";


const Pagination = ({ pokemonPage, Pokemons, pagination, page }) => {
  const filteredPokemons = useSelector((state) => state.filteredPokemons);

  useEffect(() => {
   pagination(1)
    }, [filteredPokemons]);
  

    const pageNumbers = [];

    for(let i=1; i<= Math.ceil(Pokemons/pokemonPage); i++){
        pageNumbers.push(i);
    }

  return (
  <div className="pagination-container">
    <div className="pagination-buttons">
      <button className="button-prev"
        style={page <= 1 ? { visibility: 'hidden' } : {}}
        onClick={() => pagination(page - 1)}
        >
        <span class="material-symbols-outlined">
        arrow_back
        </span>
      </button>

      <div className="buttons-page-container">

      {pageNumbers &&
        pageNumbers.map((pageNumber) => (
          pageNumbers.length === 1 ? null : (
            <button
            className="buttons-page"
            key={pageNumber}
            style={
              page === pageNumber
              ? {fontWeight: 'bold' }
              : {}
            }
            onClick={() => pagination(pageNumber)}
            >
              {pageNumber}
            </button>
          )
          ))}
      </div>
      <button
      className="button-next"
        style={
          page >= pageNumbers.length
            ? { visibility: 'hidden' }
            : {}
        }
        onClick={() => pagination(page + 1)}
      >
        <span class="material-symbols-outlined">
        arrow_forward
        </span>
      </button>
    </div>
  </div>
  
  );
};

export default Pagination;
