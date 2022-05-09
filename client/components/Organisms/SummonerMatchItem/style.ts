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
  height: 110px;
  display: flex;

  @media screen and (max-width: 760px) {
    flex-direction: column;
  }
`;

const MatchInfo = styled.div`
  width: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > .mode {
    font-weight: bold;
  }

  & > .win-lose {
    font-weight: bold;
  }

  @media screen and (max-width: 760px) {
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    & > span {
      margin: 0px 5px;
    }
  }
`;

const MatchStatusContainer = styled.div`
  display: flex;
  & > * {
    margin-right: 5px;
  }

  @media screen and (max-width: 760px) {
    width: 100%;
    height: 100%;
    justify-content: space-between;

    & > * {
      margin-right: 0px;
    }
  }
`;

const ChampionStatus = styled.div`
  display: flex;

  & > .champion-img-container {
    display: flex;
    align-items: center;

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

  @media screen and (max-width: 760px) {
    & > .champion-img-container > img {
      width: 45px;
      height: 45px;
    }

    & > .spell-img-container > img {
      width: 25px;
      height: 25px;
  }
`;

const Kda = styled.div`
  width: 80px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > .k-d-a > span {
    width: 20%;
    text-align: center;
    font-weight: bold;
  }

  & > .k-d-a > .deaths {
    color: #c6443e;
  }

  & > div > .ratio {
    font-weight: bold;
  }

  @media screen and (max-width: 760px) {
    width: 60px;
    justify-content: space-evenly;
    font-size: 13px;
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

const Items = styled.ul`
  width: 165px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media screen and (max-width: 760px) {
    width: 115px;
    align-content: center;
  }
`;

const Item = styled.li`
  width: 35px;
  height: 35px;
  margin: 3px;

  &.none {
    border-radius: 5px;
    background-color: #ccc;
  }

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  @media screen and (max-width: 760px) {
    width: 22px;
    height: 22px;
  }
`;

const Players = styled.ul`
  width: 250px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0px;

  @media screen and (max-width: 760px) {
    display: none;
  }
`;

const Player = styled.li`
  width: 120px;

  &.me {
    font-weight: bold;
  }

  & > a {
    display: flex;
  }

  & a > div {
    height: 16px;
    margin: 2px 0px;
  }

  & > a > .summoner-name {
    margin-left: 5px;
    font-size: 11px;
    line-height: 17px;
  }

  & > a > .champion-img > img {
    width: 16px;
    height: 100%;
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
