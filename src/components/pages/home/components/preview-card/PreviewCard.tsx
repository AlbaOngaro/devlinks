import { Card } from "components/card/Card";
import { useEditForm } from "components/pages/home/HomePage";
import { ProfileContents } from "components/profile-contents/ProfileContents";

import * as styles from "./PreviewCard.styles";

export function PreviewCard() {
  const { watch } = useEditForm();
  const links = watch("links");
  const profile = watch("profile");

  return (
    <Card css={styles.card}>
      <div css={styles.phone}>
        <ProfileContents links={links} profile={profile} />
      </div>
    </Card>
  );
}
