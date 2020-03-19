import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IMovie } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class MovieService {

  private moviesUrl = 'api/movies';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this.moviesUrl)
      .pipe(
        catchError(this.handleError<IMovie[]>('getMovies', []))
      );
  }

  getMovie(id: number): Observable<IMovie> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<IMovie>(url).pipe(
      catchError(this.handleError<IMovie>(`getMovie id=${id}`))
    );
  }

  searchMovies(term: string): Observable<IMovie[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<IMovie[]>(`${this.moviesUrl}/?title=${term}`).pipe(
      catchError(this.handleError<IMovie[]>('searchMovies', []))
    );
  }

  addMovie(movie: IMovie): Observable<IMovie> {
    return this.http.post<IMovie>(this.moviesUrl, movie, this.httpOptions).pipe(
      catchError(this.handleError<IMovie>('addMovie'))
    );
  }

  removeMovie(movie: IMovie | number): Observable<IMovie> {
    const id = typeof movie === 'number' ? movie : movie.id;
    const url = `${this.moviesUrl}/${id}`;

    return this.http.delete<IMovie>(url, this.httpOptions).pipe(
      catchError(this.handleError<IMovie>('removeMovie'))
    );
  }

  updateMovie(movie: IMovie): Observable<any> {
    return this.http.put(this.moviesUrl, movie, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateMovie'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}