import { FormEvent, ReactElement, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";

import { Input } from "components/Input/Input";
import { Button } from "components/Button/Button";

import * as styles from "./LoginPage.styles";
import { supabase } from "lib/supabase";
import { useRouter } from "next/router";
import { AuthLayout } from "layouts/auth/AuthLayout";
import Link from "next/link";

export function LoginPage() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword(credentials);

    if (!error) {
      router.push("/");
    }
  };

  return (
    <>
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
          Don’t have an account? <Link href="/register">Create account</Link>
        </p>
      </Form.Root>
    </>
  );
}

LoginPage.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>;
