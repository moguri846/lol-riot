import styled from "styled-components";

const SignInContainer = styled.div`
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

const OAuthButtons = styled.div`
  & > a > img {
    width: 300px;
  }
`;

export { SignInContainer, OAuthButtons };
