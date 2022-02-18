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
    width: 650px;
    display: flex;
  }
`;

const HeadeTop = styled.div`
  align-items: center;

  & > * {
    margin: 0px 10px;
  }
`;

const Ttile = styled.h1``;

const InputFormContainer = styled.div`
  width: 300px;
  display: flex;

  & > input {
    flex: 5;
  }

  & > button {
    flex: 1;
  }
`;

const LoginButtonContainer = styled.div``;

const HeaderBottom = styled.div`
  justify-content: space-around;
  align-items: center;
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

export { Header, HeadeTop, Ttile, InputFormContainer, LoginButtonContainer, HeaderBottom, Ul, Li };
