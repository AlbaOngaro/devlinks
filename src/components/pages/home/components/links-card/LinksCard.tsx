import Image from "next/image";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "components/Button/Button";
import { Card } from "components/Card/Card";

import * as styles from "./LinksCard.styles";

export function LinksCard() {
  return (
    <Card css={styles.container}>
      <header css={styles.header}>
        <h1>Customize your links</h1>
        <p>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <Button variant="secondary">
          <PlusIcon /> Add new link
        </Button>
      </header>

      <section css={styles.content}>
        <article css={(theme) => styles.item(theme, true)}>
          <Image
            src="/images/illustration-empty.svg"
            width={250}
            height={130}
            alt="empty"
          />
          <h1 css={styles.emptyTitle}>Let’s get you started</h1>
          <p css={styles.emptyBody}>
            Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We’re here to help you
            share your profiles with everyone!
          </p>
        </article>
      </section>

      <footer css={styles.footer}>
        <Button variant="primary">Save</Button>
      </footer>
    </Card>
  );
}
