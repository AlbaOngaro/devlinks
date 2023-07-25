import { Root } from "@radix-ui/react-form";

import { Card } from "components/card/Card";
import { Input } from "components/input/Input";
import { useGetProfile } from "hooks/useGetProfile";

import * as styles from "./ProfileCard.styles";
import { Button } from "components/button/Button";

export function ProfileCard() {
  const { data: user } = useGetProfile();

  return (
    <Card css={styles.container}>
      <header css={styles.header}>
        <h1>Profile Details</h1>
        <p>Add your details to create a personal touch to your profile.</p>
      </header>

      <Root css={styles.form}>
        <section css={styles.item}>
          <label>Profile picture</label>{" "}
          <fieldset>
            <input type="file" />
          </fieldset>
        </section>

        <section css={styles.item}>
          <label>First name*</label>
          <Input
            required
            validations={{ valueMissing: "This field is required!" }}
            defaultValue={user?.app_metadata?.firstName || ""}
          />
          <label>Last name*</label>
          <Input
            required
            validations={{ valueMissing: "This field is required!" }}
            defaultValue={user?.app_metadata?.lastName || ""}
          />
          <label>Email</label>
          <Input
            type="email"
            validations={{ typeMismatch: "Please use a valid email address" }}
            defaultValue={user?.email}
          />
        </section>
      </Root>

      <footer css={styles.footer}>
        <Button variant="primary">Save</Button>
      </footer>
    </Card>
  );
}
