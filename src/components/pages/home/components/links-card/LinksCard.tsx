import { PlusIcon } from "@radix-ui/react-icons";
import { Reorder } from "framer-motion";
import { useGetLinks } from "hooks/useGetLinks";
import { useFieldArray } from "react-hook-form";
import { LinksService } from "services/links";
import { Link } from "types";
import { v4 } from "uuid";

import { Button } from "components/button/Button";
import { Card } from "components/card/Card";
import { useEditForm } from "components/pages/home/HomePage";

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
      if (!defaultValues?.links) {
        return LinksService.read();
      }

      const defaultLinks = defaultValues.links as Link[];

      const toBeDeleted = defaultLinks.filter(
        (link) => !links.some((l) => l.id === link.id),
      );

      const toBeCreated = links.filter(
        (link) => !defaultLinks.some((l) => l.id === link.id),
      );

      const toBeUpdated = defaultLinks
        .filter(
          (link) =>
            !toBeDeleted.some((l) => l.id === link.id) &&
            !toBeCreated.some((l) => l.id === link.id),
        )
        .filter((link) => {
          const original = defaultLinks.find((l) => l.id === link.id);

          if (!original) {
            return false;
          }

          return JSON.stringify(link) !== JSON.stringify(original);
        });

      await Promise.all([
        LinksService.create(toBeCreated),
        LinksService.update(toBeUpdated),
        ...toBeDeleted.map((link) => LinksService.delete(link.id)),
      ]);

      return LinksService.read();
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
                  setValue(
                    `links.${i}`,
                    {
                      ...link,
                      ...newLink,
                    },
                    {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    },
                  )
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
