export interface IProps {
  id?: string;
  className?: string;
  type?: Types;
  value?: any;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  minLength?: number;
  onChange?: any;
  onKeyDown?: any;
}

type Types = "text" | "password" | "email" | "number" | "tel";
