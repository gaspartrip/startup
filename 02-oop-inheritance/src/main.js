import Actor from './Actor.js';
import EventEmitter from './EventEmitter.js';
import Logger from './Logger.js';
import Movie from './Movie.js';

// --- EXERCISE 1 ---

//Creating some movies
const matrix4 = new Movie("Matrix 4", "2021", 130);
const johnWickChapter4 = new Movie("John Wick: Chapter 4", "2021", 120);

//Testing the setters
matrix4.title = "MATRIX 4";
matrix4.year = "2022";
matrix4.duration = 150;
johnWickChapter4.title = "JOHN WICK: CHAPTER 4";
johnWickChapter4.year = "2022";
johnWickChapter4.duration = 140;

//Testing the getters and methods with the console
console.log(matrix4.title, matrix4.year, matrix4.duration);
console.log(johnWickChapter4.title, johnWickChapter4.year, johnWickChapter4.duration);

//Creating some actors
const keanuReeves = new Actor("Keanu R", 54);
const henryCavill = new Actor("Henry C", 35);

//Testing the setters
keanuReeves.name = "Keanu Reeves";
keanuReeves.age = 55;
henryCavill.name = "Henry Cavill";
henryCavill.age = 36;

//Testing the getters with the console
console.log(keanuReeves.name, keanuReeves.age);
console.log(henryCavill.name, henryCavill.age);

//Creating an event emitter
const eventEmitter = new EventEmitter();

//Creating some events

//EVENT 1 (two callbacks)

//1
const callback1 = () => {
  console.log("Callback 1");
};
eventEmitter.on("myEvent1", callback1);

//2
const callback2 = () => {
  console.log("Callback 2");
};
eventEmitter.on("myEvent1", callback2);

//EVENT 2 (one callback)
const callback3 = () => {
  console.log("Callback 3");
};
eventEmitter.on("myEvent2", callback3);

//Emitting the callbacks of EVENT 1 and EVENT 2
try {
  console.log("- Emitting Event 1...");
  eventEmitter.emit("myEvent1");
  console.log("- Emitting Event 2...");
  eventEmitter.emit("myEvent2");
}
catch (err) {
  console.log(err);
}

//Deleting "callback1" from EVENT 1
try {
  console.log("- Deleting 'callback1' from Event 1...");
  eventEmitter.off("myEvent1", callback1);
}
catch (err) {
  console.log(err);
}

//Checking/Emitting the callbacks of EVENT 1 ("callback1" should not be included)
try {
  console.log("- Emitting Event 1...");
  eventEmitter.emit("myEvent1");
}
catch (err) {
  console.log(err);
}

// --- EXERCISE 2 ---

//Creating movie
const interstellar = new Movie("Interstellar", 2014, 169);

//Using the inherited methods to publish the events 'play', 'pause' and 'resume' and theirs callbacks
interstellar.on("play", () => { console.log("The 'play' event has been emitted") });
interstellar.on("pause", () => { console.log("The 'pause' event has been emitted") });
interstellar.on("resume", () => { console.log("The 'resume' event has been emitted") });

//Calling Movie methods and triggering their events
try {
  interstellar.play(); //Output: The 'play' event has been emitted
  interstellar.pause(); //Output: The 'pause' event has been emitted
  interstellar.resume(); //Output: The 'resume' event has been emitted
}
catch (err) {
  console.log(err);
}

// --- EXERCISE 3 ---

//Creating a Movie object and some Actor objects
const theTerminator = new Movie("The Terminator", 1984, 107);
const arnold = new Actor("Arnold Schwarzenegger", 72);
const actors = [
  new Actor("Paul Winfield", 64),
  new Actor("Michael Biehn", 63),
  new Actor("Linda Hamilton", 63)
];

//Adding the Actor objects to the Movie object
theTerminator.addCast(arnold);
theTerminator.addCast(actors);

//Checking if the data (the Actor objects) is correctly stored
console.log(theTerminator.cast);

//Making an instance of Logger and making it listen to Movie's play event
const logger = new Logger();

theTerminator.on("play", logger.log);

try {
  theTerminator.play(); //Output: The 'play' event has been emitted
}
catch (err) {
  console.log(err);
}

// --- EXERCISE 4 ---

//Mixin
let social = {
  share(friendName) {
    return (friendName + " shared " + this.title);
  },
  like(friendName) {
    return (friendName + " liked " + this.title);
  }
};

//Creating a Movie object
const ironman = new Movie("Ironman", 2008, 126);

//Extending the Movie object with the Mixin subclass to have access to their methods
Object.assign(ironman, social);

//Testing
console.log(ironman.share("Gaspar"));
console.log(ironman.like("Gaspar"));