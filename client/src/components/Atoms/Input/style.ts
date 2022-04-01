import styled from "styled-components";

const Input = styled.input`
  width: 95.4%;
  border: 1px solid black;
  padding: 6px;
  outline: none;
  background-color: ${({ disabled }) => (disabled ? "lightgray" : "white")};
`;

export { Input };
