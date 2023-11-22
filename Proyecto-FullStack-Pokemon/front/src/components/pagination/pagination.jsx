import "./pagination.css";

const Pagination = ({ pokemonPage, Pokemons, pagination, page }) => {

    const pageNumbers = [];

    for(let i=1; i<= Math.ceil(Pokemons/pokemonPage); i++){
        pageNumbers.push(i);
    }

  return (
   <div>
            <div>
                <button style={page <= 1 ?
                    {display: 'none'} : {}} onClick={()=>pagination(page-1)}>Prev</button>
            </div>
            
            <div>
                <button style={page >= pageNumbers.length ?
                    {display: 'none'} : {}} onClick={()=>pagination(page+1)}>Next</button>
            </div><br/>
                {pageNumbers && pageNumbers.map((pageNumber)=>(
                    pageNumbers.length === 1 ? null :
                    <div key={pageNumber}>
                        <button style={page === pageNumber ?
                            {background:"transparent",color:"#273314"} : {}} onClick={()=>pagination(pageNumber)}>{pageNumber}</button>
                    </div>
                ))}
        </div>
  );
};

export default Pagination;
