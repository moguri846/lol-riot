import styled from "styled-components";

const Wrap = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  & > h1 {
    font-size: 13px;
    margin-bottom: 5px;
    text-align: center;
  }
`;

const PlayerContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Player = styled.div`
  width: 120px;
  height: 20px;
  display: flex;
`;

const Icon = styled.div`
  & > img {
    width: 20px;
    height: 20px;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: gray;

  & > span {
    position: absolute;
    right: 3px;
    color: #ffffff;
  }
`;

const Progress = styled.div`
  height: 100%;

  &.player {
    background-color: blue;
  }

  &.enemy {
    background-color: red;
  }
`;

export { Wrap, PlayerContainer, Player, Icon, ProgressBarContainer, Progress };
