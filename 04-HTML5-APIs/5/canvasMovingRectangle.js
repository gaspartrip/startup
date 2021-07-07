//B. Using the Canvas API, animate a rectangle's position on the screen.
//Make sure not to use setTimeout but setInterval to perform the animation.

let canvas = document.getElementById("moving-rectangle"),
  context = canvas.getContext("2d"),
  x = 5,
  y = 5,
  velocity = 10;

drawRectangle = () => {
  context.fillStyle = "black";
  context.strokeStyle = "white";
  context.lineWidth = "3";
  context.fillRect(x, y, 50, 200);
  context.strokeRect(x, y, 50, 200);
}

moveRectangle = () => {
  canvas.width = 200;
  canvas.height = 200;
  x = x + velocity;
  if (x + 50 > canvas.width || x < 0) {
    velocity *= -1;
  }
  drawRectangle();
}

setInterval(moveRectangle, 100);