import { ImageIcon } from "@radix-ui/react-icons";
import {
  ChangeEvent,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";

import * as styles from "./FilePicker.styles";

interface Props
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "value"
  > {
  label?: string;
  value?: string | FileList;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FilePicker = forwardRef(function FilePicker(
  { label, onChange, value, ...rest }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [file, setFile] = useState("");

  useEffect(() => {
    (async () => {
      if (typeof value === "string") {
        return setFile(value);
      }

      if (typeof value === "undefined") {
        return setFile("");
      }

      if (value[0]) {
        try {
          const fr = new FileReader();
          const promise = new Promise<string | undefined>((resolve, reject) => {
            fr.onload = () => {
              if (fr.result && typeof fr.result === "string") {
                return resolve(fr.result);
              }

              reject();
            };
          });

          fr.readAsDataURL(value[0]);

          const val = await promise;
          return setFile(val || "");
        } catch (error: unknown) {
          console.error(error);
          return setFile("");
        }
      }

      return setFile("");
    })();
  }, [value]);

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
      {file ? (
        <picture css={styles.picture}>
          <img src={file} alt="photoUrl" />
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
