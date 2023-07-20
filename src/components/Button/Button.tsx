import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import * as styles from "./Button.styles";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: "primary" | "secondary";
}

export function Button({ variant, ...rest }: Props) {
  return <button css={(theme) => styles.button(theme, variant)} {...rest} />;
}
