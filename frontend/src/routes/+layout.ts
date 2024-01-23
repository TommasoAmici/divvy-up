import { client } from "$lib/client";
import { get } from "svelte/store";

export const ssr = false;

export async function load({ depends }) {
  if (!get(client.authorized)) {
    return { groups: undefined };
  }

  const groups = await client.getGroups();
  depends("groups:list");
  return { groups };
}
