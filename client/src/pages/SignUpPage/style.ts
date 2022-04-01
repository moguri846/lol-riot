import styled from "styled-components";

const SignUpContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 10px;

  & > h1 {
    text-align: center;
  }

  & > * {
    margin-bottom: 10px;
  }
`;

export { SignUpContainer };
