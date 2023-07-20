import { FormEvent, useState } from "react";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import * as Form from "@radix-ui/react-form";
import Image from "next/image";

import { Button } from "components/Button/Button";
import { Card } from "components/Card/Card";
import { Input } from "components/Input/Input";

import * as styles from "./RegisterPage.styles";

export function RegisterPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    repeatPassword: "",
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
          <h1>Create account</h1>
          <p>Let’s get you started sharing your links!</p>
        </header>
        <Form.Root css={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            icon={<EnvelopeClosedIcon />}
            placeholder="e.g. alex@email.com"
            validations={{
              valueMissing: "Email is required",
              typeMismatch: "Use a valid email",
            }}
            value={credentials.email}
            onChange={(e) =>
              setCredentials((curr) => ({
                ...curr,
                email: e.target.value,
              }))
            }
          />
          <Input
            label="Passowrd"
            type="password"
            placeholder="At least 8 characters"
            icon={<LockClosedIcon />}
            min={8}
            validations={{
              valueMissing: "Password is required",
              tooShort: "Password must contain at least 8 characters",
            }}
            value={credentials.password}
            onChange={(e) =>
              setCredentials((curr) => ({
                ...curr,
                password: e.target.value,
              }))
            }
          />
          <Input
            label="Confirm password"
            type="password"
            placeholder="At least 8 characters"
            icon={<LockClosedIcon />}
            min={8}
            pattern={credentials.password}
            validations={{
              valueMissing: "Password is required",
              tooShort: "Password must contain at least 8 characters",
              patternMismatch: "Passowrds must match",
            }}
            value={credentials.repeatPassword}
            onChange={(e) =>
              setCredentials((curr) => ({
                ...curr,
                repeatPassword: e.target.value,
              }))
            }
          />
          <small>Password must contain at least 8 characters</small>
          <Button variant="primary">Create new account</Button>
          <p css={styles.login}>
            Already have an account? <a href="/login">Login</a>
          </p>
        </Form.Root>
      </Card>
    </section>
  );
}
