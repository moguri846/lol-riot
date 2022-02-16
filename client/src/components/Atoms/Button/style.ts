import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  border: 1px solid black;
  padding: 2%;

  background-color: ${({ disabled }) => (disabled ? "lightgray" : "white")};
`;

export { Button };
