import { keys } from "./input.js";

export const player = {
  x: 400,
  y: 250,
  radius: 14,
  color: "#35f2ff",
  speed: 4
};

export function updatePlayer(canvas) {
  let moveX = 0;
  let moveY = 0;

  if (keys["w"] || keys["ArrowUp"]) {
    moveY -= 1;
  }

  if (keys["s"] || keys["ArrowDown"]) {
    moveY += 1;
  }

  if (keys["a"] || keys["ArrowLeft"]) {
    moveX -= 1;
  }

  if (keys["d"] || keys["ArrowRight"]) {
    moveX += 1;
  }

  const length = Math.sqrt(moveX * moveX + moveY * moveY);

  if (length > 0) {
    moveX /= length;
    moveY /= length;
  }

  player.x += moveX * player.speed;
  player.y += moveY * player.speed;

  player.x = Math.max(
    player.radius,
    Math.min(canvas.width - player.radius, player.x)
  );

  player.y = Math.max(
    player.radius,
    Math.min(canvas.height - player.radius, player.y)
  );
}

export function drawPlayer(ctx) {
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fillStyle = player.color;
  ctx.fill();
  ctx.closePath();
}