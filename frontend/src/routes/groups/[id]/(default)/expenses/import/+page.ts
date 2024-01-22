import { client } from "$lib/client";

export async function load() {
  const importSettings = await client.getImportSettings();

  return {
    importSettings,
  };
}
