import { PlusIcon } from "@radix-ui/react-icons";
import { Reorder } from "framer-motion";
import { useGetLinks } from "hooks/useGetLinks";
import { useFieldArray } from "react-hook-form";
import { Link } from "types";
import { v4 } from "uuid";

import { Button } from "components/button/Button";
import { Card } from "components/card/Card";
import { useEditForm } from "components/pages/home/HomePage";
import { supabase } from "lib/supabase";

import { EmptyState } from "./empty-state/EmptyState";
import { LinkForm } from "./link-form/LinkForm";
import * as styles from "./LinksCard.styles";

export function LinksCard() {
  const { mutate } = useGetLinks();
  const {
    formState: { isDirty, isValid, isSubmitting, defaultValues },
    control,
    setValue,
    watch,
    handleSubmit,
  } = useEditForm();
  const { append, remove } = useFieldArray({
    control,
    name: "links",
    keyName: "key",
  });

  const links = watch("links");

  const onSubmit = handleSubmit(async ({ links }) => {
    await mutate(async () => {
      const user = await supabase.auth.getUser().then((res) => res.data.user);

      if (!user) {
        return [];
      }

      const toBeDeleted = defaultValues?.links?.filter(
        (link) => !links.some((l) => l.id === link?.id),
      );

      const toBeCreateOrUpdated = links
        .filter((link) => !defaultValues?.links?.some((l) => l?.id === link.id))
        .map((link) => ({
          id: link.id,
          uid: user.id,
          url: link.url,
          label: link.label,
          type: link.type,
          order: link.order,
        }));

      const [newLinks] = await Promise.all([
        supabase
          .from("links")
          .upsert(toBeCreateOrUpdated)
          .select()
          .order("order", { ascending: true })
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
              order: links.length,
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
          <Reorder.Group
            css={styles.linksWrapper}
            values={links.map((link) => link.id)}
            axis="y"
            onReorder={(newOrder) => {
              setValue(
                "links",
                newOrder.map((id, order) => {
                  const link = links.find((link) => link.id == id) as Link;
                  return {
                    ...link,
                    order,
                  };
                }),
                {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                },
              );
            }}
          >
            {links.map((link, i) => (
              <LinkForm
                key={link.id}
                onRemove={() => remove(i)}
                onUpdate={(newLink) =>
                  setValue(`links.${i}`, {
                    ...link,
                    ...newLink,
                  })
                }
                link={link}
              />
            ))}
          </Reorder.Group>
        )}
      </section>

      <footer css={styles.footer}>
        <Button
          variant="primary"
          disabled={!isDirty || !isValid}
          onClick={onSubmit}
          isLoading={isSubmitting}
        >
          Save
        </Button>
      </footer>
    </Card>
  );
}
