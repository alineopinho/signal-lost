import { player, updatePlayer, drawPlayer } from "./player.js";
import {
  drawFragments,
  checkFragmentCollisions,
  getCollectedFragments,
  getTotalFragments
} from "./fragments.js";
import { gameState, setGameState } from "./gameState.js";

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

function drawWinMessage() {
  if (gameState.status !== "LEVEL_COMPLETE") {
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
  if (gameState.status === "PLAYING") {
    updatePlayer(canvas);
    checkFragmentCollisions(player);

    if (getCollectedFragments() === getTotalFragments()) {
      setGameState("LEVEL_COMPLETE");
    }
  }

  render();

  requestAnimationFrame(gameLoop);
}

gameLoop();