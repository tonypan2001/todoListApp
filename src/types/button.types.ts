import type { JSX } from "react";

export type ButtonProps = {
  label?: string;
  icon?: JSX.Element;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};
