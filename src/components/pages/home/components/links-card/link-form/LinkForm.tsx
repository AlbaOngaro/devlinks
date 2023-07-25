import { css } from "@emotion/react";
import { Root } from "@radix-ui/react-form";
import { Link1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { FormEvent } from "react";
import { Link, Platform } from "types";

import { Input } from "components/input/Input";
import { Select } from "components/select/Select";

import * as styles from "./LinkForm.styles";

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
  data: option.label,
}));

interface Props extends Link {
  onRemove: (link: Link) => void;
  onUpdate: (newLink: Partial<Link>) => void;
}

export function LinkForm({ id, url, type, label, onRemove, onUpdate }: Props) {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <article css={styles.item}>
      <header css={styles.header}>
        <h6>Link #{id}</h6>
        <button
          onClick={() =>
            onRemove({
              id,
              url,
              type,
              label,
            })
          }
        >
          Remove
        </button>
      </header>
      <Root css={styles.form} onSubmit={handleSubmit}>
        <Select
          label="Platform"
          defaultOption={{ label, value: type, data: label }}
          options={PLATFORMS}
          onChange={(option) =>
            onUpdate({
              type: option.value as Platform,
              label: option.data,
            })
          }
        />
        <Input
          icon={<Link1Icon />}
          type="url"
          label="Link"
          value={url}
          onChange={(e) =>
            onUpdate({
              url: e.target.value,
            })
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
