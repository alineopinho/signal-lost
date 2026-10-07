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

export function drawFragments(ctx) {
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

export function checkFragmentCollisions(player) {
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

export function getCollectedFragments() {
  return collectedFragments;
}

export function getTotalFragments() {
  return fragments.length;
}