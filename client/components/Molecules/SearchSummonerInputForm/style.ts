import styled from "styled-components";

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

export { SearchFormContainer };
