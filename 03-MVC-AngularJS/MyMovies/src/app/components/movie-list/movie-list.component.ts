import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = [];
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

  onSubmit(movieData): void {
    if (this.movieForm.valid) {
      const title = movieData.title.trim();
      const year = movieData.year;
      const duration = movieData.duration;
      this.movieForm.reset();
      this.movieService.addMovie({ title, year, duration } as Movie)
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