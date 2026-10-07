import { player, updatePlayer, drawPlayer } from "./player.js";
import {
  drawFragments,
  checkFragmentCollisions,
  getCollectedFragments,
  getTotalFragments
} from "./fragments.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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

function render() {
  drawBackground();
  drawFragments(ctx);
  drawPlayer(ctx);
  drawHud();
}

function gameLoop() {
  updatePlayer(canvas);
  checkFragmentCollisions(player);
  render();

  requestAnimationFrame(gameLoop);
}

gameLoop();