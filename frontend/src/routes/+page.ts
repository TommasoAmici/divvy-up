import { goto } from "$app/navigation";

// redirect to the first available group if available
// there's nothing meaningful to show on the homepage
//  at the moment
export async function load({ parent }) {
  const data = await parent();
  const groupID = data.groups?.[0].id;
  if (groupID) {
    return goto(`/groups/${groupID}`);
  }
}
