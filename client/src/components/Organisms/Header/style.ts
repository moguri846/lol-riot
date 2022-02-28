import styled from "styled-components";

const Header = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;

  & > div {
    width: 760px;
    display: flex;
    justify-content: space-around;
  }
`;

const HeadeTop = styled.div`
  align-items: center;

  & > * {
    margin: 0px 10px;
  }
`;

const LoginButtonContainer = styled.div``;

const HeaderBottom = styled.div`
  align-items: center;

  & > div > .flicking-viewport {
    height: 20px;
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

export { Header, HeadeTop, LoginButtonContainer, HeaderBottom, Ul, Li };
