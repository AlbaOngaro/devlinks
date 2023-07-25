import * as styles from "./FilePicker.styles";

export function FilePicker() {
  return (
    <fieldset css={styles.fieldset}>
      <input type="file" />
    </fieldset>
  );
}
