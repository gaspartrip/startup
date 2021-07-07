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

class EventEmitter {

  constructor() {
    this._events = {};
  }

  get events() {
    return this._events;
  }

  on(eventName, callback) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    this._events[eventName].push(callback);
  }

  emit(eventName) {
    if (!this._events[eventName]) {
      throw new Error("There is no event with the name " + eventName);
    } else {
      this._events[eventName].forEach(callback => {
        callback(eventName);
      });
    }
  }

  off(eventName, callbackToRemove) {
    if (!this._events[eventName]) {
      throw new Error("There is no event with the name " + eventName);
    } else {
      this._events[eventName] = this._events[eventName].filter(callback => callback !== callbackToRemove);
    }
  }

}

class Logger {

  constructor() { }

  log(info) {
    console.log("The '" + info + "' event has been emitted");
  }

}

class Movie extends EventEmitter {
  
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
    if (Array.isArray(cast)) {
      for (var i = 0; i < cast.length; i++) {
        if (cast[i] instanceof Actor) {
          this._cast.push(cast[i]);
        }
      }
    } else {
      if (cast instanceof Actor) {
        this._cast.push(cast);
      }
    }
  }

}

const matrix4 = new Movie("Matrix 4", "2021", 130);
const johnWickChapter4 = new Movie("John Wick: Chapter 4", "2021", 120);
matrix4.title = "MATRIX 4";
matrix4.year = "2022";
matrix4.duration = 150;
johnWickChapter4.title = "JOHN WICK: CHAPTER 4";
johnWickChapter4.year = "2022";
johnWickChapter4.duration = 140;
console.log(matrix4.title, matrix4.year, matrix4.duration);
console.log(johnWickChapter4.title, johnWickChapter4.year, johnWickChapter4.duration);
const keanuReeves = new Actor("Keanu R", 54);
const henryCavill = new Actor("Henry C", 35);
keanuReeves.name = "Keanu Reeves";
keanuReeves.age = 55;
henryCavill.name = "Henry Cavill";
henryCavill.age = 36;
console.log(keanuReeves.name, keanuReeves.age);
console.log(henryCavill.name, henryCavill.age);
const eventEmitter = new EventEmitter();

const callback1 = () => {
  console.log("Callback 1");
};

eventEmitter.on("myEvent1", callback1);

const callback2 = () => {
  console.log("Callback 2");
};

eventEmitter.on("myEvent1", callback2);

const callback3 = () => {
  console.log("Callback 3");
};

eventEmitter.on("myEvent2", callback3);

try {
  console.log("- Emitting Event 1...");
  eventEmitter.emit("myEvent1");
  console.log("- Emitting Event 2...");
  eventEmitter.emit("myEvent2");
} catch (err) {
  console.log(err);
}

try {
  console.log("- Deleting 'callback1' from Event 1...");
  eventEmitter.off("myEvent1", callback1);
} catch (err) {
  console.log(err);
}

try {
  console.log("- Emitting Event 1...");
  eventEmitter.emit("myEvent1");
} catch (err) {
  console.log(err);
}

const interstellar = new Movie("Interstellar", 2014, 169);
interstellar.on("play", () => {
  console.log("The 'play' event has been emitted");
});
interstellar.on("pause", () => {
  console.log("The 'pause' event has been emitted");
});
interstellar.on("resume", () => {
  console.log("The 'resume' event has been emitted");
});

try {
  interstellar.play();
  interstellar.pause();
  interstellar.resume();
} catch (err) {
  console.log(err);
}

const theTerminator = new Movie("The Terminator", 1984, 107);
const arnold = new Actor("Arnold Schwarzenegger", 72);
const actors = [new Actor("Paul Winfield", 64), new Actor("Michael Biehn", 63), new Actor("Linda Hamilton", 63)];
theTerminator.addCast(arnold);
theTerminator.addCast(actors);
console.log(theTerminator.cast);
const logger = new Logger();
theTerminator.on("play", logger.log);

try {
  theTerminator.play();
} catch (err) {
  console.log(err);
}

let social = {
  share(friendName) {
    return friendName + " shared " + this.title;
  },

  like(friendName) {
    return friendName + " liked " + this.title;
  }

};
const ironman = new Movie("Ironman", 2008, 126);
Object.assign(ironman, social);
console.log(ironman.share("Gaspar"));
console.log(ironman.like("Gaspar"));