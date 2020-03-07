// --- CLASSES ---

class EventEmitter {

  constructor() {
    this._events = {};
  }

  get events() {
    return this._events;
  }

  on(eventName, callback) {
    //If there is no element (event) with the received eventName, we create it
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    //Finally we add the callback to the array inside the element
    this._events[eventName].push(callback);
  }

  emit(eventName) {
    //If there is no element (event) with the received eventName, we throw an error
    if (!this._events[eventName]) {
      throw new Error("There is no event with the name " + eventName);
    }
    else {
      //Otherwise, we trigger the callbacks corresponding to "eventName"
      this._events[eventName].forEach((callback) => {
        callback(eventName);
      });
    }
  }

  off(eventName, callbackToRemove) {
    //If there is no element (event) with the received eventName, we throw an error
    if (!this._events[eventName]) {
      throw new Error("There is no event with the name " + eventName);
    }
    else {
      //Otherwise, we delete the callback bringing by parameter corresponding to "eventName"
      this._events[eventName] = this._events[eventName].filter(callback => callback !== callbackToRemove);
    }
  }

}

class Movie extends EventEmitter {

  constructor(title, year, duration) {
    super();
    this._title = title;
    this._year = year;
    this._duration = duration;
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

  play() {
    super.emit("play");
  }

  pause() {
    super.emit("pause");
  }

  resume() {
    super.emit("resume");
  }

}

class Actor {

  constructor(name, age) {
    this._name = name;
    this._age = age;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get age() {
    return this._age;
  }

  set age(age) {
    this._age = age;
  }

}

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