import { Card } from "components/Card/Card";

import * as styles from "./PreviewCard.styles";
import { PreviewLink } from "components/PreviewLink/PreviewLink";
import { Service } from "components/PreviewLink/types";

const SERVICES: Service[] = [
  "github",
  "frontend-mentor",
  "twitter",
  "linkedin",
  "youtube",
  "facebook",
  "twitch",
  "devto",
  "codewars",
  "codepen",
  "freecodecamp",
  "gitlab",
  "hashnode",
  "stack-overflow",
];

export function PreviewCard() {
  const user = {
    name: "Alba Ongaro",
    email: "alba.ongaro@outlook.com",
    photoURL:
      "https://lh3.googleusercontent.com/ogw/AGvuzYbKc9vlR4BYVfv_US_wAFo82pr0vNUfIq_xWZ8wzQ=s64-c-mo",
  };

  const links = SERVICES.map((service) => ({
    type: service,
    label: `${service.charAt(0).toUpperCase()}${service.slice(1)}`,
    link: "#",
  }));

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
                <li key={link.type}>
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
