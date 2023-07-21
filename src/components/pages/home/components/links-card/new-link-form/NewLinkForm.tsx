import { Root } from "@radix-ui/react-form";
import { Input } from "components/Input/Input";
import { Select } from "components/Select/Select";

import * as styles from "./NewLinkForm.styles";
import { Link, Platform } from "types";
import { useLinksContext } from "components/pages/home/HomePage";
import Image from "next/image";
import { css } from "@emotion/react";
import { Link1Icon } from "@radix-ui/react-icons";

interface Props {
  link: Link;
  index: number;
}

const PLATFORMS = [
  { value: "github", label: "Github" },
  { value: "frontend-mentor", label: "Frontend Mentor" },
  { value: "twitter", label: "Twitter" },
  { value: "linkedin", label: "Linkedin" },
  { value: "youtube", label: "YouTube" },
  { value: "facebook", label: "Facebook" },
  { value: "twitch", label: "Twitch" },
  { value: "devto", label: "Dev.to" },
  { value: "codewars", label: "Codewars" },
  { value: "codepen", label: "Codepen" },
  { value: "freecodecamp", label: "freeCodeCamp" },
  { value: "gitlab", label: "Gitlab" },
  { value: "hashnode", label: "Hashnode" },
  { value: "stack-overflow", label: "Stack Overflow" },
].map((option) => ({
  ...option,
  label: (
    <span
      css={css`
        display: flex;
        flex-direction: row;
        gap: 12px;
        align-items: center;
      `}
    >
      <Image
        src={`/images/icon-${option.value}.svg`}
        width={20}
        height={20}
        alt={option.label}
      />
      {option.label}
    </span>
  ),
}));

export function NewLinkForm({ link, index }: Props) {
  const { setLinks } = useLinksContext();

  return (
    <article css={styles.item}>
      <header css={styles.header}>
        <h6>Link #{index + 1}</h6>
        <button
          onClick={() => setLinks((curr) => curr.filter((_, i) => i !== index))}
        >
          Remove
        </button>
      </header>
      <Root css={styles.form}>
        <Select
          label="Platform"
          defaultOption={PLATFORMS[0]}
          options={PLATFORMS}
          onChange={(option) =>
            setLinks((curr) =>
              curr.map((l, i) => {
                if (i === index) {
                  return {
                    ...l,
                    type: option.value as Platform,
                  };
                }

                return l;
              }),
            )
          }
        />
        <Input
          icon={<Link1Icon />}
          type="url"
          label="Link"
          value={link.url}
          onChange={(e) =>
            setLinks((curr) =>
              curr.map((l, i) => {
                if (i === index) {
                  return {
                    ...l,
                    url: e.target.value,
                  };
                }

                return l;
              }),
            )
          }
          validations={{
            typeMismatch: "Please check the URL",
            valueMissing: "Can’t be empty",
          }}
        />
      </Root>
    </article>
  );
}