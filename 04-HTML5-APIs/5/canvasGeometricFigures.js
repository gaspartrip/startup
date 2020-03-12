//A. Create a web page with a canvas element.
//Upon page load, draw basic geometric figures with random colors and strokes.

const drawLine = (ctx) => {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.strokeStyle = "yellow";
  ctx.lineTo(400, 200);
  ctx.stroke();
}

const drawSquare= (ctx) => {
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.rect(250, 35, 100, 50);;
  ctx.stroke();
}

const drawCircle = (ctx) => {
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.arc(200, 100, 40, 0, 2 * Math.PI);
  ctx.stroke();
}

const drawText = (ctx) => {
  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.font = "30px Arial";
  ctx.strokeText("Hello World", 70, 180);
}

const drawBackground = (ctx) => {
  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, 400, 200);
}

const drawObjects = () => {
  let c = document.getElementById("geometric-figures");
  let ctx = c.getContext("2d");
  drawBackground(ctx);
  drawText(ctx);
  drawCircle(ctx);
  drawSquare(ctx);
  drawLine(ctx);
}

window.addEventListener("load", drawObjects);