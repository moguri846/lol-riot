import styled from "styled-components";

const List = styled.li`
  display: flex;
  justify-content: space-between;

  & > div > a:hover {
    text-decoration: underline;
  }
`;

export { List };
