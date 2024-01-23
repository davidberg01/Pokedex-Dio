

const pokeApi = {}
function converterPokeApiDetailToPokemon(pokemonDetails){
    const pokemon = new Pokemon();
    pokemon.number = pokemonDetails.id
    pokemon.name = pokemonDetails.name
    const types = pokemonDetails.types.map((typeSlot)=> typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokemonDetails.sprites.other.home.front_default
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(converterPokeApiDetailToPokemon)
    
}

pokeApi.getPokemons = (offset =0 ,limit =24)=>{
const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    
return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailsRequests) => Promise.all(detailsRequests))
    .then((pokemonDetails) => pokemonDetails)
}

