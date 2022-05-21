import styled from "styled-components";

const Header = styled.header`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: 20px;

  & > div {
    width: 760px;
  }

  & > div:nth-of-type(1) > div:nth-of-type(1) {
    width: 350px;
  }

  @media screen and (max-width: 760px) {
    width: 100%;

    & > div {
      width: 100%;
    }
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const HeadeTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media screen and (max-width: 760px) {
    flex-direction: column;

    & > h1 {
      width: 100%;
      text-align: left;
    }

    & > div:nth-of-type(1) {
      width: 100%;

      & > div {
        width: 100%;
      }
    }
  }
`;

const Title = styled.h1``;

const LoginButtonContainer = styled.div`
  @media screen and (max-width: 760px) {
    position: absolute;
    top: 6px;
    right: 0px;
    margin: 0px;

    & > button {
      border: none;
    }

    & > a > button {
      border: none;
    }
  }
`;

const HeaderBottom = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px 0px;

  & > div > .flicking-viewport {
    height: 20px;
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;

    & > .famous-saying > .flicking-viewport > .flicking-camera > div {
      text-align: center;
    }
  }

  @media screen and (max-width: 375px) {
    & > .famous-saying > .flicking-viewport {
      height: 16px;
    }

    & > .famous-saying > .flicking-viewport > .flicking-camera > div {
      font-size: 12px;
    }
  }
`;

const Ul = styled.ul`
  display: flex;
  margin: 3px;
`;

const Li = styled.li`
  padding: 5px 10px;
  cursor: pointer;

  &.selected {
    border-bottom: 1px solid black;
  }
`;

export { Header, HeadeTop, Title, LoginButtonContainer, HeaderBottom, Ul, Li };
