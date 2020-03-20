import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MovieService } from './movie.service';

import { IMovie } from '../models/movie';

describe('MovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: MovieService = TestBed.get(MovieService);
    expect(service).toBeTruthy();
  });

  it('expects service to fetch the initial movies',
    inject([HttpTestingController, MovieService],
      (httpMock: HttpTestingController, service: MovieService) => {

        service.getMovies().subscribe(data => {
          expect(data.length).toBe(11);
        });

        const req = httpMock.expectOne('api/movies');
        expect(req.request.method).toEqual('GET');

        req.flush(
          [
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
          ]
        );
      })
  );

  it('expects service to fetch a movie by id',
    inject([HttpTestingController, MovieService],
      (httpMock: HttpTestingController, service: MovieService) => {

        const movie: IMovie = { id: 1, title: "Interstellar", year: 2014, duration: 169 };

        service.getMovie(1).subscribe(data => {
          expect(data).toEqual(movie);
        });

        const req = httpMock.expectOne('api/movies/1');
        expect(req.request.method).toEqual('GET');

        req.flush(
          { id: 1, title: "Interstellar", year: 2014, duration: 169 }
        );
      })
  );

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));
});