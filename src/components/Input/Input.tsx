import {
  Control,
  Field,
  Label,
  Message,
  ValidityMatcher,
} from "@radix-ui/react-form";
import { DetailedHTMLProps, InputHTMLAttributes, ReactElement } from "react";

import * as styles from "./Input.styles";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  icon?: ReactElement;
  validations?: Partial<Record<ValidityMatcher, string>>;
}

export function Input({ label, icon, validations, ...rest }: Props) {
  return (
    <Field css={styles.field} name="email">
      {label && <Label css={styles.label}>{label}</Label>}

      {validations &&
        Object.entries(validations).map(([match, message]) => (
          <Message
            key={match}
            css={styles.message}
            match={match as ValidityMatcher}
          >
            {message}
          </Message>
        ))}

      {icon && <span css={styles.icon}>{icon}</span>}

      <Control css={(theme) => styles.input(theme, Boolean(icon))} asChild>
        <input {...rest} />
      </Control>
    </Field>
  );
}
