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
alertButton.addEventListener("click", showMessage);