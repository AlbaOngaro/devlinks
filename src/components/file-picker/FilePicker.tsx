import { ImageIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import * as styles from "./FilePicker.styles";

export function FilePicker() {
  const [file, setFile] = useState<string>();

  return (
    <label css={styles.label}>
      <input
        css={styles.input}
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          if (e?.target?.files && e?.target?.files[0] && FileReader) {
            console.debug(e?.target?.files[0]);

            const fr = new FileReader();

            fr.onload = () => {
              if (fr.result && typeof fr.result === "string") {
                setFile(fr.result);
              }
            };

            fr.readAsDataURL(e?.target?.files[0]);
          }
        }}
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
      Image must be below 1024x1024px. Use PNG or JPG format.
    </label>
  );
}
