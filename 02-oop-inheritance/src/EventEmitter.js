export default class EventEmitter {

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