import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllPokemonsComponent } from './all-pokemons/all-pokemons.component';

const routes: Routes = [
  { path: "allPokemons", component: AllPokemonsComponent },
  { path: "**", redirectTo: "allPokemons" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
