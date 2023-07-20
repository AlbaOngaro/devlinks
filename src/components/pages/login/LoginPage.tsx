import { FormEvent, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import Image from "next/image";

import { Card } from "components/Card/Card";
import { Input } from "components/Input/Input";
import { Button } from "components/Button/Button";

import * as styles from "./LoginPage.styles";

export function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.debug(credentials);
  };

  return (
    <section css={styles.container}>
      <Image
        width={182}
        height={40}
        src="/images/logo-devlinks-large.svg"
        alt="logo"
      />
      <Card css={styles.card}>
        <header>
          <h1>Login</h1>
          <p>Add your details below to get back into the app</p>
        </header>
        <Form.Root css={styles.form} onSubmit={handleSubmit}>
          <Input
            type="email"
            icon={<EnvelopeClosedIcon />}
            required
            validations={{ valueMissing: "Can’t be empty" }}
            placeholder="e.g. alex@email.com"
            value={credentials.email}
            onChange={(e) =>
              setCredentials((curr) => ({
                ...curr,
                email: e.target.value,
              }))
            }
          />
          <Input
            type="password"
            icon={<LockClosedIcon />}
            required
            validations={{ valueMissing: "Can’t be empty" }}
            placeholder="Enter your password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials((curr) => ({
                ...curr,
                password: e.target.value,
              }))
            }
          />

          <Button variant="primary" type="submit">
            Login
          </Button>

          <p css={styles.register}>
            Don’t have an account? <a href="/register">Create account</a>
          </p>
        </Form.Root>
      </Card>
    </section>
  );
}
