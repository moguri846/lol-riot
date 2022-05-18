import React from "react";
import { getDataDragonImg, toLocaleString } from "../../common/func/common.func";
import * as S from "./style";

interface IProps {
  title: string;
  players: { value: number | null; champion: string }[];
}

const ProgressBar = ({ title, players }: IProps) => {
  const progressValue = (idx: number) => {
    const player0 = players[0].value;
    const player1 = players[1].value;

    if (player0 !== null && player1 !== null) {
      if (idx === 0) {
        return `${player0 > player1 ? 100 : Math.floor((player0 / player1) * 100)}%`;
      }

      return `${player1 > player0 ? 100 : Math.floor((player1 / player0) * 100)}%`;
    }

    return 0;
  };

  return (
    <S.Wrap>
      <h1>{title}</h1>
      <S.PlayerContainer>
        {players?.map((player, idx) => (
          <S.Player key={idx}>
            <S.Icon>{getDataDragonImg("champion", player.champion)}</S.Icon>
            <S.ProgressBarContainer>
              <span>{player.value !== null ? toLocaleString(player.value) : "-"}</span>
              <S.Progress
                className={idx === 0 ? "player" : "enemy"}
                style={{
                  width: `${progressValue(idx)}`,
                }}
              ></S.Progress>
            </S.ProgressBarContainer>
          </S.Player>
        ))}
      </S.PlayerContainer>
    </S.Wrap>
  );
};

export default ProgressBar;
