const initialState = {
    allPokemons: [],
    filteredPokemons: [],
    addedPokemons: [],
    types: [],
    details: [],
    evolutions: [],
}

function rootReducer (state = initialState, action) {

    switch(action.type) {

        case 'GET_POKEMONS':
            return {
                ...state,
                allPokemons: action.payload,
                filteredPokemons: action.payload,
            }

        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload,
            }

        case 'GET_EVOLUTIONS':
            return {
                ...state,
                evolutions: action.payload,
            }
            
        case 'GET_POKEMON_BY_NAME':
            const addPokemonByName = state.filteredPokemons;
            if(addPokemonByName.filter((p)=>p.name === action.payload[0].name).length > 0) {
            } else {
                addPokemonByName.push(action.payload[0]);
            }
            return{
                ...state,
                filteredPokemons: action.payload,
            }

        case 'FILTER_BY_TYPE': {
            const filteredByTypes = state.allPokemons.filter((pokemon) => pokemon.types.includes(action.payload));
            if (action.payload === "all") {
                return {...state,filteredPokemons: state.allPokemons}
            } 
            else {
                return {...state,filteredPokemons: filteredByTypes,};
            }
        }   
        
        case 'FILTER_BY_ORIGIN':
            const pokemonsByOrigin= [...state.allPokemons].filter((p=>!p.createdInDb))
            const filteredByCreatedInDb = [...state.allPokemons].filter((p=>p.createdInDb))
            if (action.payload === "all") return {...state, filteredPokemons: state.allPokemons}
            if (action.payload === "originals") return {...state, filteredPokemons: pokemonsByOrigin}
            if (action.payload === "created by User") return {...state, filteredPokemons: filteredByCreatedInDb}
        
            
        case 'ORDER_BY':
            let sortedPokemon = [...state.filteredPokemons];
            
            if (action.payload === 'ascName') {
                sortedPokemon = sortedPokemon.sort((prev, next) => prev.name.localeCompare(next.name));
            } 
            if (action.payload === 'descName') {
                sortedPokemon = sortedPokemon.sort((prev, next) => next.name.localeCompare(prev.name));
            }
            if (action.payload === 'ascAttack') {
                sortedPokemon = sortedPokemon.sort((prev, next) => prev.attack - (next.attack));
            } else if (action.payload === 'descAttack') {
                sortedPokemon = sortedPokemon.sort((prev, next) => next.attack - (prev.attack));
            }
            return {
                ...state,
                filteredPokemons: sortedPokemon
            };
            
        case "GET_DETAILS":
            return{
                ...state,
                details: action.payload,
            }

        case "CLEAN_DETAILS":
            return{
                ...state,
                details: []
            }
    
        case 'RESTORE':
            return{
                ...state,
                filteredPokemons: state.allPokemons,
            }
                
        case 'POST_POKEMON':
            return {
                ...state,
            }
        default: return state;
    }
}

export default rootReducer;
