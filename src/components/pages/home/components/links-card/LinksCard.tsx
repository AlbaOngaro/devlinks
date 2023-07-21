import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "components/Button/Button";
import { Card } from "components/Card/Card";

import { useLinksContext } from "components/pages/home/HomePage";

import * as styles from "./LinksCard.styles";
import { EmptyState } from "./empty-state/EmptyState";
import { NewLinkForm } from "./new-link-form/NewLinkForm";

function* idGenerator(): Generator<number, number, number> {
  let i = 1;

  while (true) {
    yield i++;
  }
}

const id = idGenerator();

export function LinksCard() {
  const { links, setLinks } = useLinksContext();

  return (
    <Card css={styles.container}>
      <header css={styles.header}>
        <h1>Customize your links</h1>
        <p>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <Button
          variant="secondary"
          onClick={() =>
            setLinks((curr) => [
              ...curr,
              { id: id.next().value, label: "Github", type: "github", url: "" },
            ])
          }
        >
          <PlusIcon /> Add new link
        </Button>
      </header>

      <section css={styles.content}>
        {links.length === 0 ? (
          <EmptyState />
        ) : (
          links.map((link, i) => <NewLinkForm link={link} index={i} key={i} />)
        )}
      </section>

      <footer css={styles.footer}>
        <Button variant="primary">Save</Button>
      </footer>
    </Card>
  );
}
