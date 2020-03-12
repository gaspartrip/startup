//All the saving methods were made to overwrite the value associated with the key

const textArea = document.getElementById("text-area");
const saveButton = document.getElementById("save-button");
const clearButton = document.getElementById("clear-button");

//---Local Storage---

const saveLocalStorage = (key, value) => {
  //The value is saved in the database with the key brought by parameter
  //Then to check if the item was saved correctly, the getItem() method is called
  //If the given key does not exist then getItem() return null and the method throw an error
  localStorage.setItem(key, value);
  if (localStorage.getItem(key) === null) {
    throw new Error("Error saving in Local Storage");
  }
}

const removeLocalStorage = (key) => {
  //If the item with the key brought by parameter exists, the item will be removed
  //Otherwise the method throw an error
  if (localStorage.getItem(key) !== null) {
    localStorage.removeItem(key);
  }
  else {
    throw new Error("Error deleting in Local Storage");
  }
}

//---IndexedDB---

//Creating the database "myDatabase"
let db;
let dbReq = indexedDB.open("myDatabase", 1);

dbReq.onsuccess = (event) => {
  db = event.target.result;
}

dbReq.onerror = (event) => {
  console.log("Database error: " + event.target.errorCode);
}

dbReq.onupgradeneeded = (event) => {
  //Seting the db variable to our database so we can use it 
  db = event.target.result;

  //Creating an object store (where data are stored)
  db.createObjectStore("text-area-content", { autoIncrement: false });
}

const saveIndexedDB = (key, value) => {
  let tx = db.transaction([key], "readwrite");
  let store = tx.objectStore(key);

  //Put the content of the text-area into the object store
  store.put(value, "text");
}

const removeIndexedDB = (key) => {
  let tx = db.transaction([key], "readwrite");
  let store = tx.objectStore(key);

  //Deleting all the current data out of an object store
  store.clear();
}

//---Using both Local Storage and IndexedDB---

const saveTextAreaContent = (e) => {
  e.preventDefault(); //Prevent default behavior (no refresh)
  try {
    saveLocalStorage("text-area-content", textArea.value);
    saveIndexedDB("text-area-content", textArea.value);
    alert("Stored!");
    textArea.value = "";
  }
  catch (err) {
    alert("Saving failed!");
    //An error log may be displayed
  }
}

const removeTextAreaContent = (e) => {
  e.preventDefault(); //Prevent default behavior (no refresh)
  try {
    removeLocalStorage("text-area-content");
    removeIndexedDB("text-area-content");
    alert("Removed!");
    textArea.value = "";
  }
  catch (err) {
    alert("Removing failed!");
    //An error log may be displayed
  }
}

saveButton.addEventListener("click", saveTextAreaContent);
clearButton.addEventListener("click", removeTextAreaContent);