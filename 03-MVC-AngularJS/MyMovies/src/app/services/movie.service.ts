import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie';
import { MOVIES } from '../mock-movies';

//MovieService as the provider of its service at the root level so that it can be injected anywhere in the app
@Injectable({
  providedIn: 'root',
})
export class MovieService {

  constructor() { }

  //The get data methods have an asynchronous signature

  getMovies(): Observable<Movie[]> {
    //Return an observable of mock movies (Observable<Movies[]>)
    return of(MOVIES);
  }

  getMovie(id: number): Observable<Movie> {
    return of(MOVIES.find(movie => movie.id === id));
  }

}