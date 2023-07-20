import { Select } from "components/Select/Select";

import * as styles from "./StyleGuidePage.styles";
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  Link1Icon,
} from "@radix-ui/react-icons";
import { Root } from "@radix-ui/react-form";
import { Input } from "components/Input/Input";

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

      <Root>
        <Input
          placeholder="Demo"
          icon={<EnvelopeClosedIcon />}
          type="email"
          required
          validations={{
            valueMissing: "Please check again",
            typeMismatch: "Please provide a valid email",
          }}
        />
      </Root>
    </section>
  );
}
