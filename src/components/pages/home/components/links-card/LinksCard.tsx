import { PlusIcon } from "@radix-ui/react-icons";
import { useFieldArray } from "react-hook-form";
import { v4 } from "uuid";

import { Button } from "components/button/Button";
import { Card } from "components/card/Card";

import * as styles from "./LinksCard.styles";
import { EmptyState } from "./empty-state/EmptyState";
import { LinkForm } from "./link-form/LinkForm";
import { useLinksForm } from "components/pages/home/HomePage";
import { useGetLinks } from "hooks/useGetLinks";
import { supabase } from "lib/supabase";
import { Link } from "types";

export function LinksCard() {
  const { mutate } = useGetLinks();
  const { formState, control, setValue, watch, handleSubmit } = useLinksForm();
  const {
    fields: links,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "links",
    keyName: "key",
  });

  const onSubmit = handleSubmit(async ({ links }) => {
    await mutate(async () => {
      const user = await supabase.auth.getUser().then((res) => res.data.user);

      if (!user) {
        return [];
      }

      const toBeDeleted = formState.defaultValues?.links?.filter(
        (link) => !links.some((l) => l.id === link?.id),
      );

      const toBeCreateOrUpdated = links
        .filter(
          (link) =>
            !formState.defaultValues?.links?.some((l) => l?.id === link.id),
        )
        .map((link) => ({
          id: link.id,
          uid: user.id,
          url: link.url,
          label: link.label,
          type: link.type,
        }));

      const [newLinks, deletedLinks] = await Promise.all([
        supabase
          .from("links")
          .upsert(toBeCreateOrUpdated)
          .select()
          .then((res) => {
            if (res.error) {
              console.error(res.error);
              return [];
            }

            return res.data as Link[];
          }),
        supabase
          .from("links")
          .delete()
          .in("id", toBeDeleted?.map((link) => link?.id) || []),
      ]);

      return newLinks;
    });
  });

  return (
    <Card css={styles.container}>
      <header css={styles.header}>
        <h1>Customize your links</h1>
        <p>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <Button
          variant="secondary"
          onClick={() =>
            append({
              id: v4(),
              label: "Github",
              type: "github",
              url: "",
            })
          }
        >
          <PlusIcon /> Add new link
        </Button>
      </header>

      <section css={(theme) => styles.content(theme, links.length === 0)}>
        {links.length === 0 ? (
          <EmptyState />
        ) : (
          <div css={styles.linksWrapper}>
            {links.map(({ key }, i) => {
              const link = watch(`links.${i}`);
              return (
                <LinkForm
                  key={key}
                  onRemove={() => remove(i)}
                  onUpdate={(newLink) =>
                    setValue(`links.${i}`, {
                      ...link,
                      ...newLink,
                    })
                  }
                  {...link}
                />
              );
            })}
          </div>
        )}
      </section>

      <footer css={styles.footer}>
        <Button
          variant="primary"
          disabled={!formState.isDirty || !formState.isValid}
          onClick={onSubmit}
          isLoading={formState.isSubmitting}
        >
          Save
        </Button>
      </footer>
    </Card>
  );
}
