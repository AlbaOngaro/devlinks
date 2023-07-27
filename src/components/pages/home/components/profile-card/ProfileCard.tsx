import { Root } from "@radix-ui/react-form";
import { AnimatePresence } from "framer-motion";
import { useGetProfile } from "hooks/useGetProfile";
import { Controller } from "react-hook-form";
import { ProfileService } from "services/profile";
import { StorageService } from "services/storage";
import { v4 } from "uuid";

import { Button } from "components/button/Button";
import { Card } from "components/card/Card";
import { FilePicker } from "components/file-picker/FilePicker";
import { Input } from "components/input/Input";
import { useEditForm } from "components/pages/home/HomePage";
import { Toast } from "components/toast/Toast";

import * as styles from "./ProfileCard.styles";

export function ProfileCard() {
  const { mutate } = useGetProfile();

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty, errors },
    setError,
  } = useEditForm();

  const onSubmit = handleSubmit(async (formData) => {
    await mutate(
      async () => {
        await ProfileService.update(formData.profile);
        return ProfileService.read();
      },
      { revalidate: true },
    );
  });

  return (
    <>
      <Card css={styles.container}>
        <header css={styles.header}>
          <h1>Profile Details</h1>
          <p>Add your details to create a personal touch to your profile.</p>
        </header>

        <Root css={styles.form} onSubmit={(e) => e.preventDefault()}>
          <section css={styles.item}>
            <label css={styles.label}>Profile picture</label>{" "}
            <Controller
              control={control}
              name="profile.photoURL"
              rules={{
                pattern: /^https?:\/\//,
              }}
              render={({ field: { value, onChange } }) => (
                <FilePicker
                  label="Image must be below 1024x1024px. Use PNG or JPG format."
                  value={value}
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];

                      const fr = new FileReader();
                      const promise = new Promise<string | undefined>(
                        (resolve, reject) => {
                          fr.onload = () => {
                            if (fr.result && typeof fr.result === "string") {
                              return resolve(fr.result);
                            }

                            reject();
                          };
                        },
                      );

                      fr.readAsDataURL(file);

                      const val = await promise;

                      try {
                        await new Promise<void>((resolve, reject) => {
                          const img = new Image();

                          if (!val) {
                            return reject();
                          }

                          img.src = val;

                          img.onload = () => {
                            if (img.width <= 1024) {
                              return resolve();
                            }

                            return reject();
                          };
                        });

                        onChange(val);

                        const photoURL = await StorageService.upload(
                          e.target.files[0],
                          `${v4()}.${file.name.split(".").pop()}`,
                        );
                        onChange(photoURL);
                      } catch (error: unknown) {
                        setError("profile.photoURL", {
                          message: "image is too big!",
                        });
                      }
                    }
                  }}
                />
              )}
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
      <AnimatePresence>
        {errors.profile?.photoURL?.message && (
          <Toast title="Image is too big!" duration={2000} />
        )}
      </AnimatePresence>
    </>
  );
}
