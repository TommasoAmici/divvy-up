import { client } from "$lib/client";

export async function load({ params }) {
  const groupID = params.id;
  const group = await client.getGroup(groupID);

  return {
    groupID,
    group,
  };
}
