interface PokemonI{
    abilities: Abilities[];
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
    types: Types[];
    weight: number;
}
interface Stats{
    base_stat: number;
    effort: number;
    stat: any;
}
interface Abilities{
    ability: any;
    is_hidden: boolean;
    slot: number;
}
interface Types{
    slot: number;
    type: any;
}

export{PokemonI, Abilities, Stats, Types}
