import { playerobject } from "../Store/AboutGame";
import { isNameOfGirl } from "./checkfuncs";

export async function fetchr(player: playerobject) {
  const response = await fetch(
    `https://avatar.iran.liara.run/public/${
      isNameOfGirl(player.playerName) || player.gender == "F" ? "girl" : "boy"
    }?username=${player.playerName}`
  );
  if (!response.ok)
    throw new Error(`Failed to fetch image: ${response.status}`);

  const data = await response.blob();
  const imageUrl = URL.createObjectURL(data);
  return imageUrl;
}
