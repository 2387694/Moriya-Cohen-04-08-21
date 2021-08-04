import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { FavoritesComponent } from './components/favorites/favorites.component';



const routes: Routes = [
  {
    path: "Nav", component: NavComponent, children: [
      { path: "Home", component: HomeComponent },
      { path: "Favorites", component: FavoritesComponent }
    ]
  },
  { path: '', redirectTo: 'Nav/Home', pathMatch: 'full' },
  { path: '**', component: NavComponent }

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
