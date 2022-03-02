import styled from "styled-components";

const MatchItemContainer = styled.li`
  margin-bottom: 10px;
  cursor: pointer;
  &.win {
    background-color: #9ad0f5;

    & > details > summary > div> div:nth-of-type(1) > .win-lose {
      color: #21618C;
    }
  }

  &.lose {
    background-color: #EF9A9A;

    & > details > summary > div> div:nth-of-type(1) > .win-lose {
      color: #7B241C;
    }
  }

  & > details > summary::marker {
    content: '';
  }
  & >details[open] > summary > li:before {
    transform: rotate(180deg);
  }
  & >  details > summary > li {
    position: relative;
  }

  & >  details > summary > li:before {
    content: "👍";
    position: absolute;
    right: 0px;
    bottom: -5px;
    font-size: 20px;
    transform: rotate(270deg);
    transition: .35s cubic-bezier(0, 1.65, 1, 1);
`;

const MatchItem = styled.div`
  display: flex;
  padding: 5px;
  & > div {
    display: flex;
  }
`;

const MatchInfo = styled.div`
  width: 90px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > .game-mode {
    font-weight: bold;
  }

  & > .win-lose {
    font-weight: bold;
  }
`;

const MatchStatusContainer = styled.div`
  & > * {
    margin-right: 5px;
  }
`;

const Items = styled.ul`
  width: 165px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Players = styled.ul`
  width: 250px;
  height: 100px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0px;
`;

const Player = styled.li`
  width: 120px;
  display: flex;

  &.me {
    font-weight: bold;
  }

  & > div {
    height: 16px;
    margin: 2px 0px;
  }

  & > .summoner-name {
    margin-left: 5px;
    font-size: 11px;
    line-height: 17px;
  }

  & > .champion-img > img {
    width: 100%;
    height: 100%;
  }
`;

const Item = styled.li`
  width: 35px;
  height: 35px;
  margin: 3px;
  border-radius: 5px;

  &.none {
    background-color: #ccc;
  }

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
`;
const Kda = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    width: 20%;
    text-align: center;
    font-weight: bold;
  }

  & > .deaths {
    color: #c6443e;
  }
`;

const PlayerStatus = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div > span {
    font-weight: bold;
  }
`;

const ChampionStatus = styled.div`
  display: flex;

  & > .champion-img-container {
    display: flex;
    align-items: center;
    // margin-right: 5px;

    & > img {
      width: 50px;
      height: 50px;
      margin: 0px 5px;
      border-radius: 50%;
    }
  }

  & > .spell-img-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > img {
      width: 30px;
      height: 30px;
      margin: 2px 0px;
      border-radius: 5px;
    }
  }
`;

const OptionList = styled.ul`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const OptionItem = styled.li`
  margin: 10px;

  &.selected {
    border-bottom: 1px solid black;
  }
`;

const LineGraphContainer = styled.div`
  width: 100%;
  height: 100%;

  & > * {
    background-color: #ffffff;
    transition: 1s cubic-bezier(0, 1.65, 1, 1);
  }
`;

export {
  MatchItemContainer,
  MatchItem,
  MatchInfo,
  MatchStatusContainer,
  Kda,
  PlayerStatus,
  ChampionStatus,
  Player,
  Items,
  Item,
  Players,
  OptionList,
  OptionItem,
  LineGraphContainer,
};
