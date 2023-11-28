const axios = require('axios');
const { Pokemon, Type } = require('../db');

const URL_API_POKEMON = 'https://pokeapi.co/api/v2/pokemon?limit=40';
const URL_API_POKEMON_NAME_OR_ID = 'https://pokeapi.co/api/v2/pokemon/';
const URL_API_POKEMON_TYPE = 'https://pokeapi.co/api/v2/type';


const getApiPokemons = async () => {
  try {
    const apiPokemons = [];
    const pokemonRequest = await axios.get(URL_API_POKEMON);
    const urlPokemonSubrequest = pokemonRequest.data.results.map((pokemon) => pokemon.url);

    for (const url of urlPokemonSubrequest) {
      const response = await axios.get(url);

      apiPokemons.push({
        id: response.data.id,
        name: response.data.name,
        img: response.data.sprites.other['official-artwork'].front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        speed: response.data.stats[5].base_stat,
        height: response.data.height,
        weight: response.data.weight,
        createdInDb: false,
        types: response.data.types.map((t) => t.type.name),
      });
    }

    return apiPokemons;
  } catch (error) {
    console.log(error);
  }
};


const getDbPokemons = async () => {
  const pokemonsDb = await Pokemon.findAll({
    include: {
      model: Type,
    },
  });
  const pokemonDb = pokemonsDb.map((pokemon) => {
    const result = pokemon.toJSON();
    return {
      ...result,
      types: result.types.map((type) => type.name),
    };
  });
  return pokemonDb;
};


const getAllPokemons = async () => {
  try {
    const apiPokemons = await getApiPokemons();
    const dbPokemons = await getDbPokemons();
    return [...apiPokemons, ...dbPokemons];
  } catch (error) {
    console.log(error);
  }
};

const getPokemonByNameOrId = async (id, name) => {
  if (id && !name) {
    try {
      const apiPokemon = await axios.get(`${URL_API_POKEMON_NAME_OR_ID}${id}`);
      const foundPokemon = apiPokemon.data;
      const pokemon = {
        id: foundPokemon.id,
        name: foundPokemon.name,
        img: foundPokemon.sprites.other['official-artwork'].front_default,
        hp: foundPokemon.stats[0].base_stat,
        attack: foundPokemon.stats[1].base_stat,
        defense: foundPokemon.stats[2].base_stat,
        speed: foundPokemon.stats[5].base_stat,
        height: foundPokemon.height,
        weight: foundPokemon.weight,
        types: foundPokemon.types.map((t) => t.type.name),
      };
      return pokemon;
    } catch (error) {
      console.log(error);
    }
  }
  if (!id && name) {
    try {
      const apiPokemon = await axios.get(`${URL_API_POKEMON_NAME_OR_ID}${name}`);
      const foundPokemon = apiPokemon.data;
      const pokemon = {
        id: foundPokemon.id,
        name: foundPokemon.name,
        img: foundPokemon.sprites.other['official-artwork'].front_default,
        hp: foundPokemon.stats[0].base_stat,
        attack: foundPokemon.stats[1].base_stat,
        defense: foundPokemon.stats[2].base_stat,
        speed: foundPokemon.stats[5].base_stat,
        height: foundPokemon.height,
        weight: foundPokemon.weight,
        types: foundPokemon.types.map((t) => t.type.name),
      };
      return pokemon;
    } catch (error) {
      console.log(error);
    }
  }
};

const getApiType = async () => {
  const typeApi = await axios.get(URL_API_POKEMON_TYPE);
  const types = typeApi.data.results;
  types.forEach((type) => {
    Type.findOrCreate({
      where: { name: type.name },
    });
  });
  const allTypes = await Type.findAll();
  return allTypes;
};

const getEvolution = async () => {
  try {
    
    const evolutionsPokemon = [];
    const evolutionsPokemon2 = [];
    const pokemonRequest = await axios.get("https://pokeapi.co/api/v2/evolution-chain?limit=20");
    const urlPokemonSubrequest = pokemonRequest.data.results.map((pokemon) => pokemon.url);
    
    for (const url of urlPokemonSubrequest) {
      const response = await axios.get(url);

      evolutionsPokemon.push({
        name: response.data.chain.species.name,
        evolutionName: response.data.chain.evolves_to[0].species.name,
      });
      
      if(response.data.chain.evolves_to[0].evolves_to[0]){
        evolutionsPokemon2.push({
        name: response.data.chain.evolves_to[0].species.name,
        evolutionName: response.data.chain.evolves_to[0].evolves_to[0].species.name,
      });}
    }

    return [...evolutionsPokemon, ...evolutionsPokemon2];
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  getAllPokemons,
  getDbPokemons,
  getPokemonByNameOrId,
  getApiType,
  getEvolution,
};
