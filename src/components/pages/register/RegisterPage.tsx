import * as Form from "@radix-ui/react-form";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { AuthLayout } from "layouts/auth/AuthLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, ReactElement, useState } from "react";

import { Button } from "components/button/Button";
import { Input } from "components/input/Input";
import { supabase } from "lib/supabase";

import * as styles from "./RegisterPage.styles";

export function RegisterPage() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp(credentials);

    if (!error) {
      router.push("/");
    }
  };

  return (
    <>
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
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </Form.Root>
    </>
  );
}

RegisterPage.getLayout = (page: ReactElement) => (
  <AuthLayout>{page}</AuthLayout>
);
