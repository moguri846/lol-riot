export interface IProps {
  id?: string;
  size?: Size;
  className?: string;
  value?: any;
  disabled?: boolean;
  onClick?: any;
  label: string;
  children?: any;
}

type Size = "sm" | "md" | "lg";
