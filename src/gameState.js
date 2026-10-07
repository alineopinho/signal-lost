export const gameState = {
  status: "PLAYING"
};

export function setGameState(newState) {
  gameState.status = newState;
}