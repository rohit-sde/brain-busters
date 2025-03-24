import { appreciationLines } from "./conts";

export function getWinnerMsg(playerName: string) {
  const randomLine =
    appreciationLines[Math.floor(Math.random() * appreciationLines.length)];
  return `${randomLine} Well played, ${playerName} !`;
}
