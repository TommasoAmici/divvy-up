<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import Button from "$components/Button.svelte";
  import Form from "$components/Form.svelte";
  import FormGroup from "$components/FormGroup.svelte";
  import Input from "$components/Input.svelte";
  import PageTitle from "$components/PageTitle.svelte";
  import PasswordInput from "$components/PasswordInput.svelte";
  import { client } from "$lib/client";
  import { toasts } from "$lib/toast";
  import { get } from "svelte/store";

  let email = "";
  let password = "";

  async function onSubmit(e: Event) {
    e.preventDefault();
    const authorized = await client.login(email, password);
    if (authorized) {
      await goto("/", { invalidateAll: true });
    } else {
      toasts.error("Failed to login");
    }
  }

  let authorized = get(client.authorized);
  if (browser && authorized) {
    goto("/", { invalidateAll: true });
  }
</script>

<PageTitle>Login</PageTitle>

<Form {onSubmit}>
  <FormGroup>
    <Input
      bind:value={email}
      label="Email"
      type="email"
      name="email"
      required
    />
  </FormGroup>
  <FormGroup>
    <PasswordInput bind:value={password} required />
  </FormGroup>
  <Button type="submit">Login</Button>
</Form>
