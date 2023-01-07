import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  constructor(private http: HttpClient) { }
  getAllPokemons() {
    return this.http.get('https://pokeapi.co/api/v2/pokemon-species?limit=905');
  }
  getPokemonInfo(nombre: string){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${nombre}/`);
  }
}
