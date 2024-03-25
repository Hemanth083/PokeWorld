import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import close from "../assets/close.svg";

const Home = () => {
    const [pokiData, setPokiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
                setPokiData(response.data.results);
                setLoading(false); // Set loading to false when data is fetched

            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        fetchPokemons();
    }, []);

    useEffect(() => {
        const filterPokemons = () => {
            let filtered = pokiData.filter(pokemon =>
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (selectedType) {
                filtered = filtered.filter(pokemon =>
                    pokemon.types.some(type => type.type.name === selectedType)
                );
            }
            setFilteredData(filtered);
        };

        filterPokemons();
    }, [searchTerm, selectedType, pokiData]);


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    return (
        <div className='d-flex align-items-center justify-content-center flex-column'>
            <div
                style={{ height: '720px' }}
                className='Home-landing w-100 flex-column d-flex align-items-start justify-content-end'
            >
                <div className='intro d-flex align-items-center w-50 justify-content-center flex-column mb-5 bg-opacity p-5 bg-opacity'>
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
                <div className='search-filter'>
                    <input
                        type="text"
                        placeholder="Search Pokémon"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className='imput'
                    />
                    <select value={selectedType} onChange={handleTypeChange}>
                        <option value="">All Types</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        {/* Add more type options as needed */}
                    </select>
                </div>
                <div style={{ minHeight: "1000px" }} className='poki-container'>
                    {loading ? ( // Display loading message if data is still being fetched
                        <p>Loading...</p>
                    ) : (
                        filteredData.map((pokemon, index) => (
                            <Pokemon key={index} name={pokemon.name} url={pokemon.url} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const Pokemon = ({ name, url }) => {
    const [pokemonData, setPokemonData] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await axios.get(url);
                setPokemonData(response.data);
            } catch (error) {
                console.error('Error fetching Pokémon details:', error);
            }
        };

        fetchPokemonDetails();
    }, [url]);

    const handleOpen = () => {
        setShowDetails(true); // Open the details view when clicked
    };

    const handleClose = (event) => {
        event.stopPropagation(); // Prevent the event from bubbling up to the parent div
        setShowDetails(false); // Close the details view when close button is clicked
    };


    return (
        <div className='pokemon w-75' onClick={handleOpen}>
            {pokemonData && (
                <div className={`${showDetails ? 'show-details' : ''}`}>
                    <div style={{ width: "220px" }} className='pokemon-details  h-50  d-flex  align-items-center  justify-content-center  flex-column   text-center bg-dark  p-4 container'>
                        <img
                            className='Imagepopup mb-4  '
                            style={{ width: '300px' }}
                            src={pokemonData.sprites?.other['official-artwork'].front_default}
                            alt={`${name} sprite`}
                        />
                        <p className='text-white'>{name}</p>
                    </div>
                    {showDetails && (
                        <div className='details  bg-dark d-flex bg-opacity-100 rounded-5 flex-column  align-items-center  justify-content-start  '>
                            <div className='w-75 text-end '>
                                <img src={close} width="35px" className=' bg-light text-end mt-5 button rounded ' alt="" onClick={handleClose} />
                            </div>
                            <div className=' w-100  d-flex align-items-center gap-4  justify-content-center  flex-row '>
                                <p className='text-white text-center  fs-1 border-bottom  '>{pokemonData.name}</p>
                                <div >
                                    <img
                                        className='text-center'
                                        width="65px"
                                        src={pokemonData.sprites?.versions['generation-v']['black-white'].animated.front_default}
                                        alt={`${pokemonData.name} sprite`}
                                    />
                                </div>
                            </div>
                            <div className=' w-100 BIGImage d-flex h-100   align-items-center  justify-content-start '>
                                <div className='w-100 d-flex  align-items-center  justify-content-center  flex-column '>

                                    <img
                                        className='Imagepopup mb-4  '
                                        style={{ width: '300px' }}
                                        src={pokemonData.sprites?.other['official-artwork'].front_default}
                                        alt={`${name} sprite`}
                                    />
                                </div>
                                <div className="d-flex  h-50   align-items-center   justify-content-center ">
                                    <div className=' w-75 d-flex  align-items-center  justify-content-center  gap-5   flex-column  '>
                                        <div className=' w-100  d-flex  align-items-center  justify-content-start gap-5  flex-row   '>
                                            <div>
                                                <p
                                                    className=' h-50 border-bottom text-white'>Abilities :</p>
                                                <div className='text-white'>
                                                    {pokemonData.abilities.map((ability, index) => (
                                                        <p className=' fs-6' key={index}>{index + 1}. {ability.ability.name}</p>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <p
                                                    className=' h-50 w-100 border-bottom text-white'> Type :</p>
                                                <div className='text-white'>
                                                    {pokemonData.types.map((type, index) => (
                                                        <p className=' fs-6' key={index}>{type.type.name}</p>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <p
                                                    className=' h-50 w-100 border-bottom text-white'>Physical :</p>
                                                <p className='fs-6 text-white'>{`Height: ${pokemonData.height}`}</p>
                                                <p className=' fs-6 text-white'>{`Weight: ${pokemonData.weight}`}</p>
                                            </div>
                                        </div>
                                        <div className=' w-100   h-50 d-flex  flex-column '>
                                            <p className='text-white border-bottom w-25   '>Description :</p>
                                            <p className='fs-6 w-100 text-white'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam placeat, soluta ullam inventore facere suscipit, dolorum ipsum, quo ad similique officia consequuntur nulla deserunt ab voluptas fuga id! Fugit, ut

                                            </p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
