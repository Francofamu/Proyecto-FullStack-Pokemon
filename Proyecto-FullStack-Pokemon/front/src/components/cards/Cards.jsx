import Card from '../card/Card';
import "./cards.css"

const Cards = ({allPokemons}) => {

   const pokemonList = allPokemons

   return(
      <div className='cards-container'>
         {pokemonList?.map((pokemon) =>(
         <Card key ={pokemon.id} pokemonData = {pokemon}/>
         ))}

      </div>
   )
}

export default Cards;