import {Routes} from '@angular/router'
import {authGuard} from "./shared/auth/guard/auth.guard"

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },   {
    path: 'wishlist/:id',
    loadComponent: () => import('./pages/wishlist-list/wishlist-list.component').then(m => m.WishlistListComponent),
    canActivate: [authGuard]
  }, {
    path: 'books',
    loadComponent: () => import('./pages/books-page/books-page.component').then(m => m.BooksPageComponent),
    canActivate: [authGuard]
  }, {
    path: 'book-list',
    loadComponent: () => import('./pages/book-list/book-list.component').then(m => m.BookListComponent),
    canActivate: [authGuard]
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
]

/*
canActivate: [authGuard]*/
