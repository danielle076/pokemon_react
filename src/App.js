import {useState, useEffect} from "react";
import axios from "axios";
import "./App.css";
import PokemonCard from "./Components/PokemonCard";

function App() {
    const [pokemons, setPokemons] = useState(null);
    const [pagina, setPagina] = useState(0);

    useEffect(() => {
        async function getPokemons() {
            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pagina}`
                );

                setPokemons(response.data.results);

            } catch (error) {
                alert("Ohno, all the pokemons got away");
            }
        }

        getPokemons();
    }, [pagina]);

    return (
        <>
            <header>
                <img src="http://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG5.png"
                     alt="pokemonLogo"
                     className="logo"/>
            </header>
            <div className="pageButtons">
                <button className="pageButton1"
                        disabled={pagina === 0}
                        onClick={() => setPagina(pagina - 20)}
                >
                    Vorige
                </button>
                <button className="pageButton2"
                        disabled={pagina === 1100}
                        onClick={() => setPagina(pagina + 20)}
                >
                    Volgende
                </button>
            </div>
            <div className="App">
                {pokemons &&
                pokemons.map((pokemon) => {
                    return <PokemonCard key={pokemon.name}
                                        name={pokemon.name}
                    />
                })}
            </div>
        </>
    );
}

export default App;