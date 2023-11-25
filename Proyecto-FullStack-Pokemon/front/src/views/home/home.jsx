import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import Header from "../../components/header/header"
import Pagination from "../../components/pagination/pagination"
import Cards from "../../components/cards/Cards";
import "./home.css";
import { getEvolutions, getPokemons, getTypes, restore } from "../../redux/actions";

function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const types = useSelector((state) => state.types)

  // const [loadedPokemons /*, setLoadedPokemons*/] = useState(allPokemons.length ? true : false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPage /*, setPokemonPage*/] = useState(12);
  const indexLast = currentPage * pokemonPage;
  const indexFirst = indexLast - pokemonPage;
  const currentPokemons = filteredPokemons.slice(indexFirst, indexLast);
  const pagination = (pageNumber) => {setCurrentPage(pageNumber)}


  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
    dispatch(getEvolutions())
    return () => {
      dispatch(restore());
    };
  }, [dispatch]);

  return (
    <div>
      {/* <img src="https://66.media.tumblr.com/9697ebbc4887dc57620c50a12f24c61d/tumblr_nc1rokF7r31s1rd1xo1_500.gif"></img> */}
      
      <Header />
      <Pagination 
      pokemonPage={pokemonPage}
      Pokemons={allPokemons.length}
      pagination={pagination}
      page={currentPage}/>
      <div className="home">
        <Cards allPokemons={currentPokemons} />
      </div>
    </div>
  );
}

export default Home;
