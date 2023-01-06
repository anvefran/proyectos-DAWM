/*
interface Pokemon{
    abilities: any[];
    base_experience: number;
    forms: any[];
    game_indices: any[];
    height: number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: any[];
    name: string;
    order: number;
    past_types: any[];
    species: any;
    sprites: any;
    stats: Stats[];
    types: any[];
    weight: number;
}
interface Stats{
    base_stat: number;
    effort: number;
    stat: any[];
}

export {Pokemon, Stats}*/
interface AllPokes{
    count: number;
    next: any;
    previous: any;
    results: NameAndUrl[];
}
interface NameAndUrl{
    name: string;
    url: string;
    id: number;
}
export{AllPokes, NameAndUrl}