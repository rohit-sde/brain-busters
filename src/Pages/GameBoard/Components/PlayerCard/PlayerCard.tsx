import styled from "styled-components";
import { emojis } from "../../../PlayerNames/const/const";
import { playerobject } from "../../../../Store/AboutGame";
import Loader from "../../../../Components/loader/Loader";

interface argue {
  WindowSize: number;
  sortedPlayers: playerobject[];
  position: number;
  player: playerobject;
}

const PlayerCard = ({ WindowSize, sortedPlayers, position, player }: argue) => {
  function getRank(position: number) {
    if (position == 1) return "st";
    if (position == 2) return "nd";
    if (position == 3) return "rd";
    return "th";
  }

  return (
    <div className="playerCard">
      {WindowSize > 1000 &&
        (sortedPlayers.length == 1
          ? "Solo"
          : `${position}${getRank(position)}`)}
      {player.character.length == 0 ? (
        <Loader />
      ) : (
        <span
          className={`playerImage num${
            sortedPlayers.length == 1 ? "" : position
          }`}
        >
          {emojis.includes(player.character) ? (
            <span>{player.character}</span>
          ) : (
            <img src={`${player.character}`} />
          )}
        </span>
      )}
      <NameWrapper>{WindowSize > 860 && player.playerName}</NameWrapper>
    </div>
  );
};

const NameWrapper = styled.span`
  text-wrap: nowrap;
`;
export default PlayerCard;
