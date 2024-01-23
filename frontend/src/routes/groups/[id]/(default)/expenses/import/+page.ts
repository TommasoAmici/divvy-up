import { client } from "$lib/client";

export async function load() {
  try {
    const importSettings = await client.getImportSettings();
    return {
      importSettings,
    };
  } catch (error) {
    return {
      importSettings: undefined,
    };
  }
}
