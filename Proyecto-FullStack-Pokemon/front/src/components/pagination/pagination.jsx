import "./pagination.css";

const Pagination = ({ pokemonPage, Pokemons, pagination, page }) => {

    const pageNumbers = [];

    for(let i=1; i<= Math.ceil(Pokemons/pokemonPage); i++){
        pageNumbers.push(i);
    }

  return (
  <div className="pagination-container">
    <div className="pagination-buttons">
      <button
        style={page <= 1 ? { display: 'none' } : {}}
        onClick={() => pagination(page - 1)}
      >
        Prev
      </button>
      {pageNumbers &&
        pageNumbers.map((pageNumber) => (
          pageNumbers.length === 1 ? null : (
            <button
              key={pageNumber}
              style={
                page === pageNumber
                  ? { background: 'transparent', color: '#273314' }
                  : {}
              }
              onClick={() => pagination(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        ))}
      <button
        style={
          page >= pageNumbers.length
            ? { display: 'none' }
            : {}
        }
        onClick={() => pagination(page + 1)}
      >
        Next
      </button>
    </div>
  </div>
  
  );
};

export default Pagination;
