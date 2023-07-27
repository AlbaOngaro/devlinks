import { Profile } from "types";

export class ProfileService {
  static async read(): Promise<Profile> {
    return fetch("/api/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => res.data);
  }

  static async update(profile: Profile) {
    return fetch("/api/profile", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        profile,
      }),
    });
  }
}
