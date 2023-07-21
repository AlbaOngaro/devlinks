import { Service } from "./types";

import * as styles from "./PreviewLink.styles";

interface Props {
  link: {
    type: Service;
    link: string;
    label: string;
  };
}

export function PreviewLink({ link }: Props) {
  return (
    <a css={(theme) => styles.link(theme, link.type)} href={link.link}>
      {link.label}
    </a>
  );
}
