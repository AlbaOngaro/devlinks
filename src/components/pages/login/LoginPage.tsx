import * as Form from "@radix-ui/react-form";
import {
  EnvelopeClosedIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { AuthError } from "@supabase/supabase-js";
import { AnimatePresence } from "framer-motion";
import { AuthLayout } from "layouts/auth/AuthLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, ReactElement, useState } from "react";

import { Button } from "components/button/Button";
import { Input } from "components/input/Input";
import { Toast } from "components/toast/Toast";
import { supabase } from "lib/supabase";

import * as styles from "./LoginPage.styles";

export function LoginPage() {
  const [error, setError] = useState<AuthError | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsFetching(true);

    const { error } = await supabase.auth.signInWithPassword(credentials);

    if (!error) {
      router.push("/");
    } else {
      setIsFetching(false);
      setError(error);
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

        <Button variant="primary" type="submit" isLoading={isFetching}>
          Login
        </Button>

        <p css={styles.register}>
          Don’t have an account? <Link href="/register">Create account</Link>
        </p>
      </Form.Root>

      {error && (
        <AnimatePresence>
          <Toast
            duration={2000}
            onOpenChange={() => setError(null)}
            title={
              <>
                <ExclamationTriangleIcon /> {error.message}
              </>
            }
          />
        </AnimatePresence>
      )}
    </>
  );
}

LoginPage.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>;
