import styled from "styled-components";

const SignInOrUpContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;

  & > h1 {
    text-align: center;
  }

  & > div > input {
    width: 97.4%;
  }

  & > * {
    margin-bottom: 10px;
  }

  @media screen and (max-width: 300px) {
    width: 100%;
  }
`;

const OAuthButtons = styled.div`
  & > a > img {
    width: 300px;
  }
`;

export { SignInOrUpContainer, OAuthButtons };
