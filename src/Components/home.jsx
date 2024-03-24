import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';

const Home = () => {
    const [pokiData, setPokiData] = useState([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
                setPokiData(response.data.results);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        };

        fetchPokemons();
    }, []);

    return (
        <div className='d-flex align-items-center justify-content-center flex-column'>
            <div
                style={{ height: '720px' }}
                className='Home-landing w-100 flex-column d-flex align-items-start justify-content-end'
            >
                <div className='d-flex align-items-center w-50 justify-content-center flex-column mb-5 bg-opacity p-5 bg-opacity'>
                    <h1 className='text-black'>
                        Welcome to{' '}
                        <span className='blue'>
                            <span className='yellow'>POKE</span>
                            <span className='blue'>W</span>
                            <span>or</span>
                            l<span className='blue'>D</span>{' '}
                        </span>
                    </h1>
                    <h2 className='disc'>Know more about Pokémon</h2>
                </div>
            </div>
            <div className='w-100 d-flex align-items-center justify-content-center flex-column'>
                <h1 className=' border-bottom w-100  text-center  bg-dark  text-light h-100 '>POKEMON</h1>
                <div className='poki-container'>
                    {pokiData.map((pokemon, index) => (
                        <Pokemon key={index} id={index + 1} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Pokemon = ({ id }) => {
    const [pokemonData, setPokemonData] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
                setPokemonData(response.data);
            } catch (error) {
                console.error('Error fetching Pokémon details:', error);
            }
        };

        fetchPokemonDetails();
    }, [id]);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleClose = () => {
        setShowDetails(false);
    };

    return (
        <div className='pokemon w-75' onClick={toggleDetails}>
            {pokemonData && (
                <div className={`pokemon-details bg-dark w-100 p-4 container text-center ${showDetails ? 'show-details' : ''}`}>
                    <img width='120px' src={pokemonData.sprites.front_default} alt={pokemonData.name} />
                    <p className='text-white'>{pokemonData.name}</p>
                    {showDetails && (
                        <div className='details bg-dark '>
                            <p className='text-white'>Height: {pokemonData.height}</p>
                            <p className='text-white'>Weight: {pokemonData.weight}</p>
                            {/* Add additional details here */}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
