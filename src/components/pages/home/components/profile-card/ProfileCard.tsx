import { Root } from "@radix-ui/react-form";
import { useGetProfile } from "hooks/useGetProfile";
import { useForm } from "react-hook-form";

import { Button } from "components/button/Button";
import { Card } from "components/card/Card";
import { FilePicker } from "components/file-picker/FilePicker";
import { Input } from "components/input/Input";
import { supabase } from "lib/supabase";

import * as styles from "./ProfileCard.styles";

export function ProfileCard() {
  const { data: user, mutate } = useGetProfile();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm<{
    firstName: string;
    lastName: string;
    photoURL: string | FileList;
    email: string;
  }>({
    defaultValues: {
      firstName: user?.user_metadata.firstName,
      lastName: user?.user_metadata.lastName,
      photoURL: user?.user_metadata.photoURL,
      email: user?.email,
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    await mutate(
      async (current) => {
        const { photoURL } = formData;

        if (typeof photoURL !== "string" && photoURL[0]) {
          const {
            data: { publicUrl },
          } = await supabase.storage
            .from("avatars")
            .upload(`public/${current?.id}.png`, photoURL[0], {
              upsert: true,
              cacheControl: "0",
            })
            .then((res) => {
              if (res.data) {
                return supabase.storage
                  .from("avatars")
                  .getPublicUrl(res.data?.path);
              }
              return {
                data: {
                  publicUrl: "",
                },
              };
            });

          const {
            data: { user },
            error,
          } = await supabase.auth.updateUser({
            data: {
              ...formData,
              photoURL: publicUrl,
            },
          });
          if (error || !user) {
            return current;
          }
          return user;
        }

        const {
          data: { user },
          error,
        } = await supabase.auth.updateUser({
          data: formData,
        });
        if (error || !user) {
          console.error(error);
          return current;
        }
        return user;
      },
      { revalidate: true },
    );
  });

  return (
    <Card css={styles.container}>
      <header css={styles.header}>
        <h1>Profile Details</h1>
        <p>Add your details to create a personal touch to your profile.</p>
      </header>

      <Root css={styles.form} onSubmit={(e) => e.preventDefault()}>
        <section css={styles.item}>
          <label css={styles.label}>Profile picture</label>{" "}
          <FilePicker
            label="Image must be below 1024x1024px. Use PNG or JPG format."
            value={watch("photoURL")}
            {...register("photoURL")}
          />
        </section>

        <section css={styles.item}>
          <label css={styles.label}>First name*</label>
          <Input
            required
            validations={{ valueMissing: "This field is required!" }}
            placeholder="e.g. John"
            {...register("firstName", { required: true })}
          />
          <label css={styles.label}>Last name*</label>
          <Input
            required
            validations={{ valueMissing: "This field is required!" }}
            placeholder="e.g. Appleseed"
            {...register("lastName", { required: true })}
          />
          <label css={styles.label}>Email</label>
          <Input
            type="email"
            validations={{ typeMismatch: "Please use a valid email address" }}
            placeholder="e.g. email@example.com"
            disabled
            {...register("email")}
          />
        </section>
      </Root>

      <footer css={styles.footer}>
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={!isDirty || !isValid}
          isLoading={isSubmitting}
        >
          Save
        </Button>
      </footer>
    </Card>
  );
}
