import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  border: 1px solid black;
  padding: 6px 0px 6px 6px;
  outline: none;
  background-color: ${({ disabled }) => (disabled ? "lightgray" : "white")};
`;

export { Input };
