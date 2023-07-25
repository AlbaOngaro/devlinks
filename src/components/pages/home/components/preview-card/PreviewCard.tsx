import { Card } from "components/card/Card";
import { useEditForm } from "components/pages/home/HomePage";
import { PreviewLink } from "components/preview-link/PreviewLink";

import * as styles from "./PreviewCard.styles";

export function PreviewCard() {
  const { watch } = useEditForm();
  const links = watch("links");
  const profile = watch("profile");

  return (
    <Card css={styles.card}>
      <div css={styles.phone}>
        <header css={styles.header}>
          <div css={styles.avatar}>
            {typeof profile.photoURL === "string" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.photoURL} alt="user pic" />
            )}
          </div>
          <h3 css={styles.name}>
            {profile.firstName || ""}
            {profile.lastName || ""}
          </h3>
          <p css={styles.email}>{profile.email}</p>
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
