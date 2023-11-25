import axios from 'axios';

export function getPokemons(){
    return async function(dispatch){
        const pokemons = await axios.get('http://localhost:3001/pokemons');
        return dispatch({
            type: 'GET_POKEMONS',
            payload: pokemons.data
        })
    }
}

export function getTypes(){
    return async function(dispatch){
        const types = await axios.get('http://localhost:3001/types');
        // console.log('Action getTypes (API o DB)--->', types.data)
        return dispatch({
            type: 'GET_TYPES',
            payload: types.data
        })
    }
}

export function getEvolutions(){
    return async function(dispatch){
        const evolutions = await axios.get('http://localhost:3001/evolutions');
        return dispatch({
            type: 'GET_EVOLUTIONS',
            payload: evolutions.data
        })
    }
}

export function getPokemonByName(name){
    return async function(dispatch){
            const pokemon = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            console.log(pokemon.data)
            return dispatch({
                type: 'GET_POKEMON_BY_NAME',
                payload: pokemon.data
            })
    
    }
}

export function filterByType(payload){
    console.log(payload)
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export function filterByOrigin(payload){
    return{
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}

export function orderBy(payload){
    return{
        type: 'ORDER_BY',
        payload
    }
}

export function getDetails(id){
    return async function(dispatch){
        try{
            const pokemon = await axios.get(`http://localhost:3001/pokemons/${id}` );
            return dispatch({
                type: 'GET_DETAILS',
                payload: pokemon.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function cleanDetail(){
    return{
        type: 'CLEAN_DETAILS',
    }
}

export function restore(){
    return{
        type: 'RESTORE',
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        try{
            await axios.post('http://localhost:3001/pokemons', payload);
            return dispatch({
                type: 'POST_POKEMON',
            })
        } catch(error) {
            console.log(error)
        }
    }
}


