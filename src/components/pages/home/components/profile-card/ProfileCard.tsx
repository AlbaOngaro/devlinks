import { Root } from "@radix-ui/react-form";
import { useGetProfile } from "hooks/useGetProfile";
import { userToProfile } from "utils/userToProfile";

import { Button } from "components/button/Button";
import { Card } from "components/card/Card";
import { FilePicker } from "components/file-picker/FilePicker";
import { Input } from "components/input/Input";
import { useEditForm } from "components/pages/home/HomePage";
import { supabase } from "lib/supabase";

import * as styles from "./ProfileCard.styles";

export function ProfileCard() {
  const { mutate } = useGetProfile();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isValid, isDirty },
  } = useEditForm();

  const onSubmit = handleSubmit(async (formData) => {
    await mutate(
      async (currentProfile) => {
        const { photoURL } = formData.profile;

        if (typeof photoURL !== "string" && photoURL[0]) {
          const {
            data: { user: currentUser },
          } = await supabase.auth.getUser();

          if (!currentUser) {
            return currentProfile;
          }

          const {
            data: { publicUrl },
          } = await supabase.storage
            .from("avatars")
            .upload(`public/${currentUser.id}.png`, photoURL[0], {
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
              ...formData.profile,
              photoURL: publicUrl,
            },
          });

          if (error || !user) {
            return currentProfile;
          }

          return userToProfile(user);
        }

        const {
          data: { user },
          error,
        } = await supabase.auth.updateUser({
          data: formData.profile,
        });

        if (error || !user) {
          return currentProfile;
        }

        return userToProfile(user);
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
            value={watch("profile.photoURL")}
            {...register("profile.photoURL")}
          />
        </section>

        <section css={styles.item}>
          <label css={styles.label}>First name*</label>
          <Input
            required
            validations={{ valueMissing: "This field is required!" }}
            placeholder="e.g. John"
            {...register("profile.firstName", { required: true })}
          />
          <label css={styles.label}>Last name*</label>
          <Input
            required
            validations={{ valueMissing: "This field is required!" }}
            placeholder="e.g. Appleseed"
            {...register("profile.lastName", { required: true })}
          />
          <label css={styles.label}>Email</label>
          <Input
            type="email"
            validations={{ typeMismatch: "Please use a valid email address" }}
            placeholder="e.g. email@example.com"
            disabled
            {...register("profile.email")}
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
