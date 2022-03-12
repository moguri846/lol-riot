import React from "react";
import * as S from "./style";
import { getDataDragonImg } from "../../pages/common/commonFunc";
import { toLocaleString } from "../common/function/common.function";

interface IProps {
  title: string;
  players: { value: number | undefined; champion: string }[];
}

const ProgressBar = ({ title, players }: IProps) => {
  const progressValue = (idx: number) => {
    const player0 = players[0];
    const player1 = players[1];

    if (player0.value && player1.value) {
      if (idx === 0) {
        return `${player0.value > player1.value ? 100 : Math.floor((player0.value / player1.value) * 100)}%`;
      }

      return `${player1.value > player0.value ? 100 : Math.floor((player1.value / player0.value) * 100)}%`;
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
              <span>{player.value ? toLocaleString(player.value) : "-"}</span>
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
