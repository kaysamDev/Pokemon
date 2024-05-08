import { useEffect, useMemo, useState } from "react";
import { pokemon } from "..";

interface lessPokemonInfo {
  results: pokemon[]
}



export default function useFetch(initialOffset = 0, initialLimit = 10) {
  const [data, setData] = useState<pokemon | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pokemonData, setPokemonData] = useState<pokemon[]>([]);
  
  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${initialOffset}&limit=${initialLimit}`;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setData(data);
        setError(null);
        fetchPokemonDetails(data); // Call fetchPokemonDetails after setting data
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPokemonDetails = async (data: lessPokemonInfo) => {
      if (data.results) {
        const newData = await Promise.all(
          data.results.map(async (pokemon: pokemon) => {
            const response = await fetch(pokemon.url);
            if (!response.ok) {
              throw new Error("Failed to fetch Pokémon details");
            }
            const pokemonDetail = await response.json();
            return pokemonDetail;
          })
        );
        setPokemonData(newData);
        
      }
    };

    fetchData();
  }, [initialOffset, initialLimit]);

  const cachedPokemonData = useMemo(()=> pokemonData, [pokemonData])
  return { data, isLoading, error, pokemonData: cachedPokemonData};
}
