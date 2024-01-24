import { FC } from "react";
import { Counter } from "../../../components/Counter";
import {
  useGameLobby,
  gameLobbyActions,
} from "../../gameLobby/hooks/useGameLobby";
import { PlayerInfo } from "../models/PlayerInfo";
import { Avatar } from "../../avatar/components/Avatar";
import styles from "./PlayerCard.module.scss";
import { TextInput } from "../../../components/inputs/TextInput";

export type PlayerCardProps = PlayerInfo & {
  status?: "playing" | "editing" | "none";
};

export const PlayerCard: FC<PlayerCardProps> = ({
  id,
  name,
  avatarSeed,
  score,
  status = "none",
}) => {
  const { players } = useGameLobby();
  const isLeading =
    status === "playing" &&
    score > 0 &&
    players.every((otherPlayer) => score >= otherPlayer.score);

  return (
    <div className={styles.card}>
      <Avatar avatarSeed={avatarSeed} isLeading={isLeading} />
      {status === "editing" ? (
        <TextInput
          value={name}
          onChange={(newName) =>
            gameLobbyActions.player.edit(id, { name: newName })
          }
        />
      ) : (
        <h2>{name}</h2>
      )}

      {status === "playing" && (
        <Counter
          count={score}
          onDecrement={() => gameLobbyActions.score.decrement(name)}
          onIncrement={() => gameLobbyActions.score.increment(name)}
        />
      )}
    </div>
  );
};
