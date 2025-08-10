import type { JSX } from "react";

export type ButtonProps = {
  children?: React.ReactNode;
  label?: string;
  icon?: JSX.Element;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};
