//1. Creating our index page with some sections

//Self-Invoking Function
(function () {
  window.addEventListener("load", function (event) {
    //When the page finished loading the 'hidden section' must fade in (attribute 'hidden' false to true)
    const hiddenSection = document.getElementsByClassName("hidden-section")[0];
    console.log(hiddenSection.hidden);
    //2 seconds delay for further appreciation
    setTimeout(() => { hiddenSection.hidden = true; }, 2000);
    console.log(hiddenSection.hidden);
  })
})();

//2. Adding some events

const showMessage = () => {
  alert("Alert message");
};

const alertButton = document.getElementById("alert-button");
//alertButton.addEventListener("click", showMessage);

//3. Data fetching

const fetchData = async () => {
  const joke = document.getElementById("joke");
  const jokeSection = document.getElementById("joke-section");
  try {
    const res = await fetch("http://api.icndb.com/jokes/random");
    const data = await res.json();
    joke.innerHTML = data.value.joke;
  }
  catch (err) {
    //If a server error occurs section content must turn red
    jokeSection.style.backgroundColor = "red";
  }
}

//Replace the button's click event with this new function
alertButton.addEventListener("click", fetchData);

//4. Data fetching with parameters

const fetchRepositories = async (e) => {
  //No page reload
  e.preventDefault();
  //Input with type="text" to perform a search for any value
  const searchText = document.getElementById("search-text").value;
  //'List of repositories' section, in the right side of the screen
  const listOfRepositories = document.getElementById("list-of-repositories");
  listOfRepositories.innerHTML = ""; //Cleaning previous data
  const res = await fetch("https://api.github.com/search/repositories?q=" + searchText);
  const data = await res.json();
  var items = data.items;
  for (var i = 0; i < items.length; i++) {
    items[i] = "<li class='list-group-item'>" + items[i].name + "</li>";
    listOfRepositories.innerHTML = listOfRepositories.innerHTML + items[i];
  }
}

const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", fetchRepositories);

//6. DOM manipulation

const createTable = (array) => {

  //Function that takes as input a matrix of data and outputs a DOM structure representing a table

  //Table section
  tableSection = document.getElementById("table");

  //Table
  var tbl = document.createElement("table");

  //Atributes
  tbl.setAttribute("class", "table table-dark");

  //COLUMNS
  var tr = document.createElement("tr");
  //Column name
  var th = document.createElement("th");
  th.appendChild(document.createTextNode("Name"));
  tr.appendChild(th);
  //Column age
  var th = document.createElement("th");
  th.appendChild(document.createTextNode("Age"));
  tr.appendChild(th);
  //Append to table
  tbl.appendChild(tr);

  //ELEMENTS
  for (var i = 0; i < array.length; i++) {
    var tr = document.createElement("tr");
    var tdName = document.createElement("td");
    var tdAge = document.createElement("td");
    tdName.appendChild(document.createTextNode(array[i].name));
    tdAge.appendChild(document.createTextNode(array[i].age));
    tr.appendChild(tdName);
    tr.appendChild(tdAge);
    tbl.appendChild(tr);
  }

  //Append to section
  tableSection.appendChild(tbl);
}

const array = [
  {
    name: "Gaspar",
    age: 26
  },
  {
    name: "Luis",
    age: 21
  },
  {
    name: "Josefina",
    age: 35
  },
  {
    name: "Maria",
    age: 31
  },
  {
    name: "Adriana",
    age: 24
  }
]

createTable(array);