import { Link, Profile } from "types";

import { PreviewLink } from "components/preview-link/PreviewLink";

import * as styles from "./ProfileContents.styles";

export function ProfileContents({
  links,
  profile,
}: {
  links: Link[];
  profile: Profile;
}) {
  return (
    <>
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
    </>
  );
}
