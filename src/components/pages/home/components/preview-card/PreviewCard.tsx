import { Card } from "components/Card/Card";

import * as styles from "./PreviewCard.styles";
import { PreviewLink } from "components/PreviewLink/PreviewLink";
import { useLinksContext } from "components/pages/home/HomePage";

export function PreviewCard() {
  const user = {
    name: "Alba Ongaro",
    email: "alba.ongaro@outlook.com",
    photoURL:
      "https://lh3.googleusercontent.com/ogw/AGvuzYbKc9vlR4BYVfv_US_wAFo82pr0vNUfIq_xWZ8wzQ=s64-c-mo",
  };

  const { links } = useLinksContext();

  return (
    <Card css={styles.card}>
      <div css={styles.phone}>
        <header css={styles.header}>
          <div css={styles.avatar}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {user.photoURL && <img src={user.photoURL} alt="user pic" />}
          </div>
          <h3 css={styles.name}>{user.name}</h3>
          <p css={styles.email}>{user.email}</p>
        </header>
        {links && (
          <div css={styles.wrapper}>
            <ul css={styles.links}>
              {links.map((link) => (
                <li key={link.id}>
                  <PreviewLink link={link} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}
