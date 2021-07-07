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
          expect(data.length).toBe(3);
        });

        const req = httpMock.expectOne('api/movies');
        expect(req.request.method).toEqual('GET');

        req.flush(
          [
            { id: 0, title: "The Dark Knight", year: 2008, duration: 152, imageUrl: "assets/img/the-dark-knight.jpg" },
            { id: 1, title: "Interstellar", year: 2014, duration: 169, imageUrl: "assets/img/interstellar.jpg" },
            { id: 2, title: "Alien", year: 1979, duration: 117, imageUrl: "assets/img/alien.jpg" }
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