import {
  Button as Btn,
  CustomFlowbiteTheme,
  ButtonProps as BtnProps,
} from "flowbite-react";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

export type ButtonType = "primary" | "secondary" | "tertiary" | "failure";

type ButtonProps = {
  variant?: ButtonType;
  as?: "button" | "a" | typeof Link;
  to?: string;
  children: ReactNode;
  isFull?: boolean;
  outline?: boolean;
} & BtnProps;

const customTheme: CustomFlowbiteTheme["button"] = {
  color: {
    primary:
      "bg-primary-light text-white hover:bg-primary active:bg-primary-dark",
    secondary:
      "bg-secondary-light text-white hover:bg-secondary active:bg-secondary",
    tertiary:
      "bg-tertiary-light text-white hover:bg-tertiary active:bg-tertiary",
    failure: "bg-red-500 text-white hover:bg-red-700 active:bg-red-700",
  },
};

const Button: FC<ButtonProps> = ({
  variant = "primary",
  as: Component = "button",
  children,
  to,
  isFull = false,
  outline = false,
  ...props
}) => {
  return (
    <Btn
      theme={customTheme}
      color={variant}
      {...(props as BtnProps)}
      outline={outline}
    >
      {children}
    </Btn>
  );
};

export default Button;
