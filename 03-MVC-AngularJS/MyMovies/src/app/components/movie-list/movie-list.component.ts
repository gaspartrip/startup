import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { IMovie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: IMovie[] = [];
  movieForm;
  alertMessage = "";

  constructor(private movieService: MovieService, private formBuilder: FormBuilder) {
    this.movieForm = this.formBuilder.group({
      title: ["", Validators.required],
      year: ["", Validators.required],
      duration: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => this.movies = movies);
  }

  onSubmit(movieData: IMovie): void {
    if (this.movieForm.valid) {
      movieData.title = movieData.title.trim();
      this.movieForm.reset();
      this.movieService.addMovie(movieData)
        .subscribe(movie => {
          this.movies.push(movie);
          this.alertMessage = "Movie added!";
        });
    }
    else {
      this.alertMessage = "All inputs must be filled out correctly!";
    }
  }

  cleanAlertMessage(): void {
    this.alertMessage = "";
  }

}