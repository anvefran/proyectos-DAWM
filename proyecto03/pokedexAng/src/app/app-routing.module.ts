import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllPokemonsComponent } from './all-pokemons/all-pokemons.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { RandomComponent } from './random/random.component';

const routes: Routes = [
  { path: "allPokemons", component: AllPokemonsComponent },
  { path: "pokemon/:name", component: PokemonComponent},
  { path: "random", component: RandomComponent},
  { path: "**", redirectTo: "allPokemons" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
