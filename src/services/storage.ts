import { supabase } from "lib/supabase";

export class StorageService {
  static async upload(file: File, name?: string): Promise<string> {
    const {
      data: { publicUrl },
    } = await supabase.storage
      .from("avatars")
      .upload(`public/${name || file.name}.png`, file)
      .then((res) => {
        if (res.data) {
          return supabase.storage.from("avatars").getPublicUrl(res.data?.path);
        }

        return {
          data: {
            publicUrl: "",
          },
        };
      });

    return publicUrl;
  }
}
