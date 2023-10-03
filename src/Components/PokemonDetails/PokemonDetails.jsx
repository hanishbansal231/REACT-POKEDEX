import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'
function PokemonDetails() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [pokemon, setPokemon] = useState({});
    async function downloadPokemon() {
        setIsLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response);
        setPokemon({
            name: response?.data?.name,
            image: response?.data?.sprites?.other?.dream_world?.front_default,
            weight: response?.data?.weight,
            height: response?.data?.height,
            types: response?.data?.types?.map((item) => item.type.name)
        });
        setIsLoading(false);
    }
    console.log(pokemon);
    useEffect(() => {
        downloadPokemon();
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
            }
        </div>
    );
}

export default PokemonDetails;