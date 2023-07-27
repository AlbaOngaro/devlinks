import { Link } from "types";

export class LinksService {
  static async create(links: Link[]): Promise<Link[]> {
    return fetch("/api/links", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        links,
      }),
    })
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return [];
      });
  }

  static async read(): Promise<Link & { uid: string }[]> {
    return fetch("/api/links", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return [];
      });
  }

  static async update(links: Link[]) {
    return fetch("/api/links", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        links,
      }),
    })
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return [];
      });
  }

  static async delete(id: string): Promise<void> {
    await fetch(`/api/links/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return [];
      });
  }
}
