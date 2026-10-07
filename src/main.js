import { player, updatePlayer, drawPlayer } from "./player.js";
import {
  drawFragments,
  checkFragmentCollisions,
  getCollectedFragments,
  getTotalFragments
} from "./fragments.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameWon = false;

function drawBackground() {
  ctx.fillStyle = "#07111f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawHud() {
  ctx.fillStyle = "#ffffff";
  ctx.font = "18px monospace";
  ctx.fillText(
    `Fragmentos: ${getCollectedFragments()}/${getTotalFragments()}`,
    20,
    30
  );
}

function drawWinMessage() {
  if (!gameWon) {
    return;
  }

  ctx.fillStyle = "#35f2ff";
  ctx.font = "32px monospace";
  ctx.textAlign = "center";

  ctx.fillText(
    "SINAL RECUPERADO",
    canvas.width / 2,
    canvas.height / 2
  );

  ctx.textAlign = "start";
}

function render() {
  drawBackground();
  drawFragments(ctx);
  drawPlayer(ctx);
  drawHud();
  drawWinMessage();
}

function gameLoop() {
  updatePlayer(canvas);
  checkFragmentCollisions(player);

  if (getCollectedFragments() === getTotalFragments()) {
    gameWon = true;
  }

  render();

  requestAnimationFrame(gameLoop);
}

gameLoop();