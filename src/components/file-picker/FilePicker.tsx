import { ImageIcon } from "@radix-ui/react-icons";
import {
  ChangeEvent,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from "react";

import * as styles from "./FilePicker.styles";

interface Props
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "value"
  > {
  label?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FilePicker = forwardRef(function FilePicker(
  { label, onChange, value, ...rest }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <label css={styles.label}>
      <input
        css={styles.input}
        type="file"
        accept="image/png, image/jpeg"
        ref={ref}
        onChange={onChange}
        {...rest}
      />
      {value ? (
        <picture css={styles.picture}>
          <img src={value} alt="photoUrl" />
        </picture>
      ) : (
        <article css={styles.placeholder}>
          <ImageIcon /> + Upload Image
        </article>
      )}
      {label}
    </label>
  );
});
