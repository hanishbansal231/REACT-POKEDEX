import axios from "axios";
import { useEffect, useState } from "react";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: false,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: '',
    });

    async function downloadPokemons() {
        setPokemonListState((prev) => ({ ...prev, isLoading: true }));

        const response = await axios.get(pokemonListState.pokedexUrl); // this downloads list of 20 pokemons
        const pokemonResult = response?.data?.results; // we get the array of pokemons from result
        console.log(response?.data)

        setPokemonListState((prev) => (
            {
                ...prev,
                nextUrl: response?.data?.next,
                prevUrl: response?.data?.previous
            }
        ));

        // iterating over the array of pokemons, and using their url, to create an array of promises
        // that will download those 20 pokemons
        const pokemonResultPromis = pokemonResult.map((item) => axios.get(item?.url));


        // passing the promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromis);
        // console.log(pokemonData);


        // now iterate on the data of each pokemon, and extract id,name,image,types
        const pokeListResult = pokemonData?.map((pokeData) => {
            const pokemon = pokeData?.data;
            return {
                id: pokemon.id,
                name: pokemon?.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                type: pokemon.types,
            }
        });

        setPokemonListState((prev) => (
            { 
                ...prev, 
                pokemonList: pokeListResult, 
                isLoading: false 
            }
        ));
    }


    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
                {
                    pokemonListState.isLoading
                        ?
                        (
                            <div className="custom-loader"></div>
                        )
                        :

                        pokemonListState.pokemonList.map((pokemon, idx) => <Pokemon id={pokemon?.id} key={idx} name={pokemon?.name} image={pokemon?.image} />)
                }
            </div>
            <div className="controls">
                <button disabled={pokemonListState.prevUrl === null} onClick={() => {
                    setPokemonListState({ ...pokemonListState, pokedexUrl: pokemonListState.prevUrl });
                }}>Prev</button>
                <button disabled={pokemonListState.nextUrl === null} onClick={() => {
                    setPokemonListState({ ...pokemonListState, pokedexUrl: pokemonListState.nextUrl });
                }}>Next</button>
            </div>
        </div>
    )
}

export default PokemonList;