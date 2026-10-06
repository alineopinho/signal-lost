const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 400,
  y: 250,
  radius: 14,
  color: "#35f2ff",
  speed: 4
};

const keys = {};

window.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

window.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

function drawBackground() {
  ctx.fillStyle = "#07111f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updatePlayer() {
  if (keys["w"] || keys["ArrowUp"]) {
    player.y -= player.speed;
  }

  if (keys["s"] || keys["ArrowDown"]) {
    player.y += player.speed;
  }

  if (keys["a"] || keys["ArrowLeft"]) {
    player.x -= player.speed;
  }

  if (keys["d"] || keys["ArrowRight"]) {
    player.x += player.speed;
  }

  player.x = Math.max(
    player.radius,
    Math.min(canvas.width - player.radius, player.x)
  );

  player.y = Math.max(
    player.radius,
    Math.min(canvas.height - player.radius, player.y)
  );
}

function drawPlayer() {
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fillStyle = player.color;
  ctx.fill();
  ctx.closePath();
}

function render() {
  drawBackground();
  drawPlayer();
}

function gameLoop() {
  updatePlayer();
  render();

  requestAnimationFrame(gameLoop);
}

gameLoop();
render();
