interface Pokemon{
    name: string;
    url: string;
}

interface Pokemonurl {
    count: number;
    next: string;
    results: Pokemon
}
export {Pokemon, Pokemonurl}
