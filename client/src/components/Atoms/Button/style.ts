import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  border: 1px solid black;
  padding: 6px;

  background-color: ${({ disabled }) => (disabled ? "lightgray" : "white")};
`;

export { Button };
