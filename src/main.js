const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#07111f";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const player = {
  x: 400,
  y: 250,
  radius: 14,
  color: "#35f2ff"
};

ctx.beginPath();
ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
ctx.fillStyle = player.color;
ctx.fill();
ctx.closePath();
