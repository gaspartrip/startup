import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MOVIES } from '../../mock-movies';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = MOVIES;

  constructor() { }

  ngOnInit(): void {
  }

}