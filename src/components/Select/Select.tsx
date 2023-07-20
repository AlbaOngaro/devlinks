import { Fragment, ReactNode } from "react";
import * as RUISelect from "@radix-ui/react-select";
import { CaretDownIcon, Link1Icon } from "@radix-ui/react-icons";

import * as styles from "./Select.styles";

interface Option {
  label: ReactNode;
  value: string;
}

interface Props {
  placeholder?: string;
  options: Option[];
}

export function Select({ options, placeholder }: Props) {
  return (
    <RUISelect.Root>
      <RUISelect.Trigger css={styles.trigger}>
        <RUISelect.Icon css={(theme) => styles.icon(theme, false)}>
          <Link1Icon />
        </RUISelect.Icon>
        <RUISelect.Value placeholder={placeholder} />
        <RUISelect.Icon css={(theme) => styles.icon(theme, true)}>
          <CaretDownIcon />
        </RUISelect.Icon>
      </RUISelect.Trigger>

      <RUISelect.Portal>
        <RUISelect.Content
          css={styles.content}
          sideOffset={8}
          position="popper"
          align="center"
        >
          <RUISelect.Viewport css={styles.viewport}>
            {options.map((option, i) => (
              <Fragment key={option.value}>
                <RUISelect.Item css={styles.item} value={option.value}>
                  <RUISelect.ItemText>{option.label}</RUISelect.ItemText>
                </RUISelect.Item>
                {i < options.length - 1 && (
                  <RUISelect.Separator css={styles.separator} />
                )}
              </Fragment>
            ))}
          </RUISelect.Viewport>
        </RUISelect.Content>
      </RUISelect.Portal>
    </RUISelect.Root>
  );
}
