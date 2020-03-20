import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IMovie } from '../..//models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movie: IMovie;
  saveStatus: String = "";

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(id)
      .subscribe(movie => this.movie = movie);
  }

  addImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.movie.imageUrl = event.target.result;
      }
    }
  }

  removeMovie(): void {
    this.movieService.removeMovie(this.movie).subscribe();
    this.router.navigateByUrl('/movies');
  }

  save(): void {
    if(this.movie.title) {
      this.movieService.updateMovie(this.movie)
      .subscribe(() => {
        this.saveStatus = "Changes saved";
      });
    }
    else {
      this.saveStatus = "The movie must have a title!";
    }
  }

  onClosed(closed: boolean) {
    if(closed) {
      this.saveStatus = "";
    }
  }

} 