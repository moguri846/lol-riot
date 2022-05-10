import styled from "styled-components";

const Spectator = styled.div`
  width: 100%;
  height: 230px;

  & > .not-found,
  & > .error {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SpectatorPlayerList = styled.ul`
  width: 100%;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const SpectatorPlayer = styled.li`
  width: 49%;
  display: flex;
  justify-content: space-between;
  padding: 4px;

  & > .name {
    font-weight: bold;
  }
  & > .name:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  &.red {
    flex-direction: row-reverse;

    & > div {
      flex-direction: row-reverse;
    }
  }
`;

const ChampionStatus = styled.div`
  & {
    display: flex;
    align-items: center;

    & > .spells > li {
      width: 12px;
      height: 12px;
      padding: 1px;

      display: flex;

      & > img {
        width: 100%;
        height: 100%;
      }
    }
  }

  & > .champion-img {
    width: 26px;
    height: 26px;

    & > img {
      width: 100%;
      height: 100%;
    }
  }
`;

const BannedChampionList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const BannedChampion = styled.li`
  width: 30px;
  height: 30px;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

export { Spectator, SpectatorPlayerList, SpectatorPlayer, ChampionStatus, BannedChampionList, BannedChampion };
