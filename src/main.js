import { player, updatePlayer, drawPlayer } from "./player.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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

function drawBackground() {
  ctx.fillStyle = "#07111f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
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
  drawPlayer(ctx);
  drawHud();
}

function gameLoop() {
  updatePlayer(canvas);
  checkFragmentCollisions();
  render();

  requestAnimationFrame(gameLoop);
}

gameLoop();