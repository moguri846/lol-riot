import styled from "styled-components";
import { IProps } from "./interface/Button.interface";

const setButtonWidthUsingSize = (size: "sm" | "md" | "lg") => {
  switch (size) {
    case "sm":
      return "3.8rem";
    case "md":
      return "5.5rem";
    case "lg":
      return "7.1rem";
    default:
      return "100%";
  }
};

const setButtonHeightUsingSize = (size: "sm" | "md" | "lg") => {
  switch (size) {
    case "sm":
      return "1.6rem";
    case "md":
      return "1.8rem";
    case "lg":
      return "2rem";
    default:
      return "100%";
  }
};

const Button = styled.button<IProps>`
  width: ${({ size }) => (size ? setButtonWidthUsingSize(size) : "100%")};
  height: ${({ size }) => (size ? setButtonHeightUsingSize(size) : "100%")};
  border: 1px solid black;
  padding: 6px;

  background-color: ${({ disabled }) => (disabled ? "lightgray" : "white")};
`;

export { Button };
