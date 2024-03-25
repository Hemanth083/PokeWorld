// mainComponent.js
import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';
import "./mainComponent.css";
import Home from './Components/home';
import Menu from './assets/menu.svg'

function MainComponent() {
    const [currentPage, setCurrentPage] = useState("Home");
    const [data, setData] = useState(null); // Define the data state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
                setData(response.data.results);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleNavClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="d-flex flex-row mainContainer">
            <Navbar className="flex-column align-items-center justify-content-center nav fixed-top" bg="dark" variant="dark">
                <Nav className="d-flex w-100 justify-content-center align-items-center links flex-column h-75">
                    <Nav.Link onClick={() => handleNavClick('Home')} className={` NavButtons ${currentPage === 'Home' ? 'active' : ''}`} href="#home">Home</Nav.Link>
                </Nav>
            </Navbar>

            {showMenu && (
                <div className="menu-content">
                    <button className="close-button" onClick={() => setShowMenu(false)}>&times;</button>
                    <div className="menu-items "><h1>Home</h1></div>
                </div>
            )}

            <div className='Content'>
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>}
                {currentPage === "Home" && !loading && !error && <Home pokiData={data} />} {/* Use data instead of pokiData */}
            </div>

            <img src={Menu} alt="Menu" className="menu-icon" onClick={() => setShowMenu(!showMenu)} />
        </div>
    );
}

export default MainComponent;
