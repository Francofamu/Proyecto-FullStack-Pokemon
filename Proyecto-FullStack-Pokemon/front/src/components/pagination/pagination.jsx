import "./pagination.css";


const Pagination = ({ pokemonPage, Pokemons, pagination, page }) => {

    const pageNumbers = [];

    for(let i=1; i<= Math.ceil(Pokemons/pokemonPage); i++){
        pageNumbers.push(i);
    }

  return (
  <div className="pagination-container">
    <div className="pagination-buttons">
      <button className="button-prev"
        style={page <= 1 ? { display: 'none' } : {}}
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
              ? { background: 'transparent' }
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
            ? { display: 'none' }
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
