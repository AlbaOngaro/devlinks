import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import * as styles from "./Button.styles";
import { Loader } from "./Loader";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: "primary" | "secondary";
  isLoading?: boolean;
}

export function Button({ variant, isLoading, children, ...rest }: Props) {
  return (
    <button css={(theme) => styles.button(theme, variant)} {...rest}>
      {isLoading && <Loader />} {children}
    </button>
  );
}
