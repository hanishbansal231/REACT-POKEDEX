import axios from "axios";
import { useEffect, useState } from "react";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";
function PokemonList() {
    const {pokemonListState,setPokemonListState} = usePokemonList();
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