import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IMovie } from '../models/movie';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const movies = [
      { id: 0, title: "The Dark Knight", year: 2008, duration: 152, imageUrl: "assets/img/the-dark-knight.jpg" },
      { id: 1, title: "Interstellar", year: 2014, duration: 169, imageUrl: "assets/img/interstellar.jpg" },
      { id: 2, title: "Alien", year: 1979, duration: 117, imageUrl: "assets/img/alien.jpg" }
    ];
    return {movies};
  }

  genId(movies: IMovie[]): number {
    return movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) + 1 : 0;
  }

}