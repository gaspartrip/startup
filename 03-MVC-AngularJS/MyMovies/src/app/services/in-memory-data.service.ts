import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from '../models/movie';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const movies = [
      { id: 0, title: "The Dark Knight", year: 2008, duration: 152 },
      { id: 1, title: "Interstellar", year: 2014, duration: 169 },
      { id: 2, title: "The Departed", year: 2006, duration: 151 },
      { id: 3, title: "Braveheart", year: 1995, duration: 178 },
      { id: 4, title: "The Matrix", year: 1999, duration: 136 },
      { id: 5, title: "Terminator 2: Judgment Day", year: 1991, duration: 137 },
      { id: 6, title: "Alien", year: 1979, duration: 117 },
      { id: 7, title: "The Martian", year: 2015, duration: 144 },
      { id: 8, title: "Rogue One: A Star Wars Story", year: 2016, duration: 133 },
      { id: 9, title: "Blade Runner 2049", year: 2017, duration: 164 },
      { id: 10, title: "Ford v Ferrari", year: 2019, duration: 152 }
    ];
    return {movies};
  }

  genId(movies: Movie[]): number {
    return movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) + 1 : 0;
  }

}