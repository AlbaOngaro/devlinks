import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Link } from "types";

import * as styles from "./PreviewLink.styles";

interface Props {
  link: Link;
}

export function PreviewLink({ link }: Props) {
  return (
    <a css={(theme) => styles.link(theme, link.type)} href={link.url}>
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
