import Image from "next/image";

import * as styles from "../LinksCard.styles";

export function EmptyState() {
  return (
    <article css={(theme) => styles.item(theme, true)}>
      <Image
        src="/images/illustration-empty.svg"
        width={250}
        height={130}
        alt="empty"
      />
      <h1 css={styles.emptyTitle}>Let’s get you started</h1>
      <p css={styles.emptyBody}>
        Use the “Add new link” button to get started. Once you have more than
        one link, you can reorder and edit them. We’re here to help you share
        your profiles with everyone!
      </p>
    </article>
  );
}
