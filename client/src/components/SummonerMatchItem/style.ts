import styled from "styled-components";

const MatchItemContainer = styled.li`
  margin-bottom: 10px;

  &.win {
    background-color: #85c1e9;
  }

  &.lose {
    background-color: #ec7063;
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

const MatchItem = styled.li`
  display: flex;
  padding: 5px;
  & > div {
    display: flex;
  }
`;

const MatchInfo = styled.div`
  width: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MatchStatusContainer = styled.div`
  & > .enemy {
    flex-direction: row-reverse;

    & > .champion-status {
      flex-direction: row-reverse;
    }
  }
`;

const Player = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 10px;
  }
`;

const Items = styled.ul`
  width: 165px;
`;

const Item = styled.li`
  width: 35px;
  height: 35px;
  display: inline-block;
  padding: 3px;
  & > img {
    width: 100%;
    height: 100%;
  }
`;
const Kda = styled.div`
  width: 70px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    width: 100%;
    text-align: center;
  }
`;

const PlayerStatus = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
      width: 35px;
      height: 35px;
      padding-bottom: 5px;
    }
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
  LineGraphContainer,
};
