export interface IProps {
  id?: string;
  size?: Size;
  className?: string;
  value?: any;
  disabled?: boolean;
  onClick?: any;
  children?: any;
}

type Size = "sm" | "md" | "lg";
