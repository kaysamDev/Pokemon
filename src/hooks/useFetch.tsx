import { useEffect, useMemo, useState, useCallback } from "react";
import { pokemon } from "../..";

interface lessPokemonInfo {
  results: pokemon[]
}

export default function useFetch(initialOffset = 0, initialLimit = 500) {
  const [data, setData] = useState<lessPokemonInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pokemonData, setPokemonData] = useState<pokemon[]>([]);
  const [currentBatch, setCurrentBatch] = useState<number>(0);

  const fetchPokemonDetails = useCallback(async (data: lessPokemonInfo, batch: number) => {
    if (data.results) {
      const start = batch * 20;
      const end = start + 20;
      const batchResults = data.results.slice(start, end);

      const newData = await Promise.all(
        batchResults.map(async (pokemon: pokemon) => {
          const response = await fetch(pokemon.url);
          if (!response.ok) {
            throw new Error("Failed to fetch Pokémon details");
          }
          const pokemonDetail = await response.json();
          return pokemonDetail;
        })
      );
      setPokemonData(prev => [...prev, ...newData]);
      setCurrentBatch(batch + 1);
    }
  }, []);

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
        fetchPokemonDetails(data, 0); // Fetch the first batch of Pokémon details
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [initialOffset, initialLimit, fetchPokemonDetails]);

  useEffect(() => {
    if (data && currentBatch * 20 < data.results.length) {
      fetchPokemonDetails(data, currentBatch); // Fetch the next batch of Pokémon details
    }
  }, [data, currentBatch, fetchPokemonDetails]);

  const cachedPokemonData = useMemo(() => pokemonData, [pokemonData]);
  
  return { data, isLoading, error, pokemonData: cachedPokemonData };
}