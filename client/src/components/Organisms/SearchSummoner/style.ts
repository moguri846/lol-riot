import styled from "styled-components";

const SearchUserContainer = styled.div``;

const Title = styled.h1``;

const SearchFormContainer = styled.div`
  width: 350px;
  display: flex;

  & > input {
    flex: 5;
  }

  & > button {
    flex: 1;
  }
`;

export { SearchUserContainer, Title, SearchFormContainer };
