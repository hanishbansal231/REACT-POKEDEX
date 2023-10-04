import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'
import usePokemonList from "../../hooks/usePokemonList";
function PokemonDetails() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [pokemon, setPokemon] = useState({});
    async function downloadPokemon() {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon(() => ({
                name: response?.data?.name,
                image: response?.data?.sprites?.other?.dream_world?.front_default,
                weight: response?.data?.weight,
                height: response?.data?.height,
                types: response?.data?.types?.map((item) => item.type.name)
            }));
            console.log('Start');
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    }
    const [pokemonListState, setPokemonListState] = usePokemonList(`https://pokeapi.co/api/v2/type/${pokemon.types[0]}`, true);
    useEffect(() => {
        downloadPokemon();
        console.log(pokemonListState);
    }, []);
    return (
        <div className="pokemon-details-wrapper">
            {
                isLoading
                    ?
                    (
                        <div className="custom-loader"></div>
                    )
                    :
                    (
                        pokemon && (
                            <>
                                <img className="pokemon-details-image" src={pokemon.image} />
                                <div className="pokemon-details-name"><span> {pokemon.name}</span></div>
                                <div className="pokemon-details-name">Height: {pokemon.height}</div>
                                <div className="pokemon-details-name">Weigth: {pokemon.weight}</div>
                                <div className="pokemon-details-types">
                                    {pokemon && pokemon?.types?.map((type, idx) => (
                                        <div key={idx}>
                                            {type}
                                        </div>
                                    ))
                                    }
                                </div>
                            </>
                        )
                    )
            }
            {
                pokemonListState.pokemonList &&
                (
                    <div>
                        More {pokemon?.types} Type Pokemons
                        <ul>
                            {


                                pokemonListState.pokemonList.map((item, idx) => (
                                    <li key={idx}>{item.pokemon.name}</li>
                                ))

                            }
                        </ul>
                    </div>
                )
            }

        </div>
    );
}

export default PokemonDetails;