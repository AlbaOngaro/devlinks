import { useGetProfile } from "hooks/useGetProfile";

import { Card } from "components/card/Card";
import { useLinksForm } from "components/pages/home/HomePage";
import { PreviewLink } from "components/preview-link/PreviewLink";

import * as styles from "./PreviewCard.styles";

export function PreviewCard() {
  const { data: user } = useGetProfile();

  const { watch } = useLinksForm();
  const links = watch("links");

  return (
    <Card css={styles.card}>
      <div css={styles.phone}>
        <header css={styles.header}>
          <div css={styles.avatar}>
            {user?.app_metadata?.photoURL && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user?.app_metadata?.photoURL} alt="user pic" />
            )}
          </div>
          <h3 css={styles.name}>{user?.app_metadata?.name}</h3>
          <p css={styles.email}>{user?.email}</p>
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
