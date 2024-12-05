import {Routes} from '@angular/router'
import {authGuard} from "./shared/auth/guard/auth.guard"

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  }, {
    path: 'books',
    loadComponent: () => import('./pages/books-page/books-page.component').then(m => m.BooksPageComponent),
    canActivate: [authGuard]
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
]

/*
canActivate: [authGuard]*/
