const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 400,
  y: 250,
  radius: 14,
  color: "#35f2ff",
  speed: 4
};

const fragments = [
  {
    x: 650,
    y: 180,
    radius: 10,
    color: "#ffd84a",
    collected: false
  },
  {
    x: 180,
    y: 120,
    radius: 10,
    color: "#ffd84a",
    collected: false
  },
  {
    x: 620,
    y: 390,
    radius: 10,
    color: "#ffd84a",
    collected: false
  }
];

let collectedFragments = 0;

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

function drawFragments() {
  fragments.forEach((fragment) => {
    if (fragment.collected) {
      return;
    }

    ctx.beginPath();
    ctx.arc(fragment.x, fragment.y, fragment.radius, 0, Math.PI * 2);
    ctx.fillStyle = fragment.color;
    ctx.fill();
    ctx.closePath();
  });
}

function drawHud() {
  ctx.fillStyle = "#ffffff";
  ctx.font = "18px monospace";
  ctx.fillText(
    `Fragmentos: ${collectedFragments}/${fragments.length}`,
    20,
    30
  );
}

function checkFragmentCollisions() {
  fragments.forEach((fragment) => {
    if (fragment.collected) {
      return;
    }

    const dx = player.x - fragment.x;
    const dy = player.y - fragment.y;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const minimumDistance = player.radius + fragment.radius;

    if (distance < minimumDistance) {
      fragment.collected = true;
      collectedFragments++;
    }
  });
}

function render() {
  drawBackground();
  drawFragments();
  drawPlayer();
  drawHud();
}

function gameLoop() {
  updatePlayer();
  checkFragmentCollisions();
  render();

  requestAnimationFrame(gameLoop);
}

gameLoop();