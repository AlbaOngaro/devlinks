import * as RUIToast from "@radix-ui/react-toast";
import { motion } from "framer-motion";
import { ReactNode } from "react";

import * as styles from "./Toast.styles";

interface Props extends Omit<RUIToast.ToastProps, "title"> {
  title: ReactNode;
  description?: string;
  action?: string;
  onClick?: () => void;
  duration?: number;
}

export function Toast({
  title,
  description,
  action,
  onClick,
  duration,
  ...rest
}: Props) {
  return (
    <>
      <RUIToast.Root css={styles.root} duration={duration} asChild {...rest}>
        <motion.li initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}>
          <RUIToast.Title css={styles.title}>{title}</RUIToast.Title>
          {description && (
            <RUIToast.Description>{description}</RUIToast.Description>
          )}
          {action && (
            <RUIToast.Action asChild altText={action}>
              <button onClick={onClick}>x</button>
            </RUIToast.Action>
          )}
          <RUIToast.Close />
        </motion.li>
      </RUIToast.Root>
    </>
  );
}
