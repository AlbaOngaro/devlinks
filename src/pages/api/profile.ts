import { NextApiRequest, NextApiResponse } from "next";
import { Profile } from "types";

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
    case "GET":
      res.json(user.user_metadata);
      return;
    case "PATCH": {
      const profile = req.body.profile as Profile;

      const {
        data: { user },
        error,
      } = await supabase.auth.updateUser({
        data: profile,
      });

      if (error || !user) {
        res.status(500).json({
          message: error?.message,
        });
        return;
      }

      res.json(user.user_metadata);
    }
    default:
      res.status(405).end();
  }
}
