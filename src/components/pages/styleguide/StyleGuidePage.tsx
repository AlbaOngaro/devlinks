import { Select } from "components/Select/Select";

import * as styles from "./StyleGuidePage.styles";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function StyleGuidePage() {
  return (
    <section css={styles.container}>
      <article>
        <Select
          placeholder="Select"
          options={[
            {
              label: (
                <span>
                  <GitHubLogoIcon /> GitHub
                </span>
              ),
              value: "GitHub",
            },
            {
              label: <span>Frontend Mentor</span>,
              value: "Frontend Mentor",
            },
          ]}
        />
      </article>
    </section>
  );
}
