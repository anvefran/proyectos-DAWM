interface TypeI {
    damage_relations: Damage;
    game_indices: any[];
    generation: any;
    id: number;
    move_damage_class: any;
    moves: any[];
    name: string;
    names: any[];
    pokemon: any[];
}
interface Damage{
    double_damage_from: any[];
    double_damage_to: any[];
    half_damage_from: any[];
    half_damage_to: any[];
    no_damage_from: any[];
    no_damage_to: any[];
}
export{TypeI, Damage}