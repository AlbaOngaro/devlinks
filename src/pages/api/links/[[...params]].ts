import { NextApiRequest, NextApiResponse } from "next";
import { Link } from "types";

import { supabase } from "lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const refreshToken = req.cookies["dl-refresh-token"];
  const accessToken = req.cookies["dl-access-token"];

  if (!refreshToken || !accessToken) {
    res.status(401).end();
    return;
  }

  await supabase.auth.setSession({
    refresh_token: refreshToken,
    access_token: accessToken,
  });

  const {
    error,
    data: { user },
  } = await supabase.auth.getUser();

  if (error || !user) {
    res.status(401).end();
    return;
  }

  switch (req.method) {
    case "POST": {
      const links = req.body.links as Link[];

      if (!links) {
        res.status(400).end();
        return;
      }

      if (links.length === 0) {
        res.status(304).end();
        return;
      }

      const { data, error } = await supabase
        .from("links")
        .insert(
          links.map((link) => ({
            ...link,
            uid: user.id,
          })),
        )
        .select()
        .order("order", { ascending: true });

      if (error) {
        res.status(500).json({
          message: error.message,
        });
        return;
      }

      res.json({
        links: data,
      });
      return;
    }
    case "GET": {
      const { data: links = [], error } = await supabase
        .from("links")
        .select<"links", Link>()
        .eq("uid", user.id)
        .order("order", { ascending: true });

      if (error) {
        res.status(500).json({
          message: error.message,
        });
        return;
      }

      res.json({
        links,
      });
      return;
    }
    case "PATCH": {
      const links = req.body.links as Link[];

      if (!links) {
        res.status(400).end();
        return;
      }

      if (links.length === 0) {
        res.status(304).end();
        return;
      }

      const { data, error } = await supabase
        .from("links")
        .upsert(
          links.map((link) => ({
            ...link,
            uid: user.id,
          })),
        )
        .select()
        .order("order", { ascending: true });

      if (error) {
        res.status(500).json({
          message: error.message,
        });
        return;
      }

      res.json({
        links: data,
      });
      return;
    }
    case "DELETE": {
      const id = req?.query?.params?.at(0);

      if (!id) {
        res.status(400).end();
        return;
      }

      const { error } = await supabase.from("links").delete().eq("id", id);

      if (error) {
        res.status(500).json({
          message: error.message,
        });
        return;
      }

      res.status(200).end();
      return;
    }
    default:
      res.status(405).end();
      return;
  }
}
