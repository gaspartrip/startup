import Actor from './Actor.js';
import EventEmitter from './EventEmitter.js';

export default class Movie extends EventEmitter {

  constructor(title, year, duration) {
    super();
    this._title = title;
    this._year = year;
    this._duration = duration;
    this._cast = [];
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get year() {
    return this._year;
  }

  set year(year) {
    this._year = year;
  }

  get duration() {
    return this._duration;
  }

  set duration(duration) {
    this._duration = duration;
  }

  get cast() {
    return this._cast;
  }

  set cast(cast) {
    this._cast = cast;
  }

  play() {
    super.emit("play");
  }

  pause() {
    super.emit("pause");
  }

  resume() {
    super.emit("resume");
  }

  addCast(cast) {
    //Allows the addition of one or more Actors (an array) to a movie
    if (Array.isArray(cast)) {
      for (var i = 0; i < cast.length; i++) {
        if (cast[i] instanceof Actor) {
          this._cast.push(cast[i]);
        }
      }
    }
    else {
      if (cast instanceof Actor) {
        this._cast.push(cast);
      }
    }
  }

}