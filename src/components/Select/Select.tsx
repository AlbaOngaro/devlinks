import { CaretDownIcon } from "@radix-ui/react-icons";
import * as RUISelect from "@radix-ui/react-select";
import { Fragment, ReactElement, ReactNode } from "react";

import * as styles from "./Select.styles";

export interface Option<T> {
  label: ReactNode;
  value: string;
  data: T;
}

interface Props<T> {
  placeholder?: string;
  options: Option<T>[];
  icon?: ReactElement;
  label?: string;
  defaultOption?: Option<T>;
  onChange: (option: Option<T>) => void;
}

export function Select<T extends string>({
  options,
  placeholder,
  icon,
  label,
  defaultOption,
  onChange,
}: Props<T>) {
  return (
    <RUISelect.Root
      css={styles.container}
      defaultValue={defaultOption?.value}
      onValueChange={(value) => {
        const option = options.find((option) => option.value === value);
        if (option) {
          onChange(option);
        }
      }}
    >
      {label && <label css={styles.label}>{label}</label>}
      <RUISelect.Trigger css={styles.trigger}>
        {icon && (
          <RUISelect.Icon css={(theme) => styles.icon(theme, false)}>
            {icon}
          </RUISelect.Icon>
        )}
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
