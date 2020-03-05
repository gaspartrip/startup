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