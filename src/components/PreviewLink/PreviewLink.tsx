import { Service } from "./types";

import * as styles from "./PreviewLink.styles";
import Image from "next/image";
import { ArrowRightIcon } from "@radix-ui/react-icons";

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
      <Image
        alt={`${link.label} Icon`}
        src={`/images/icon-${link.type}.svg`}
        width={20}
        height={20}
      />
      {link.label}

      <ArrowRightIcon />
    </a>
  );
}
