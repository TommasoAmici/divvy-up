import { client } from "$lib/client";

export const ssr = false;

export async function load({ depends }) {
  depends("groups:list");
  const groups = await client.getGroups();
  return { groups };
}
