import axios from "axios";
import { useEffect, useState } from "react";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    async function downloadPokemons() {
        setIsLoading(true);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonResult = response?.data?.results;
        const pokemonResultPromis = pokemonResult.map((item) => axios.get(item?.url));
        const pokemonData = await axios.all(pokemonResultPromis);
        console.log(pokemonData);
        const res = pokemonData?.map((pokeData) => {
            const pokemon = pokeData?.data;
            return {
                id: pokemon.id,
                name: pokemon?.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                type: pokemon.types,
            }
        });
        setPokemonList(res);
        setIsLoading(false);
    }
    useEffect(() => {
        downloadPokemons();
    }, []);

    return (
        <div className="pokemon-list-wrapper">
            {
                isLoading
                    ?
                    (
                        <div className="custom-loader"></div>
                    )
                    :
                    (
                        <div>
                            {
                                pokemonList.map((pokemon, idx) => (
                                    <Pokemon key={idx} name={pokemon?.name} image={pokemon?.image} />
                                ))
                            }
                        </div>
                    )
            }
        </div>
    )
}

export default PokemonList;