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
  import { get } from "svelte/store";

  let name = "";
  let email = "";
  let password = "";

  async function onSubmit(e: Event) {
    e.preventDefault();
    const created = await client.signup(name, email, password);
    if (created) {
      goto("/login");
    }
  }

  let authorized = get(client.authorized);
  if (browser && authorized) {
    goto("/");
  }
</script>

<PageTitle>Sign up</PageTitle>

<Form {onSubmit}>
  <FormGroup>
    <Input bind:value={name} label="Name" name="name" />
  </FormGroup>
  <FormGroup>
    <Input bind:value={email} label="Email" type="email" name="email" />
  </FormGroup>
  <FormGroup>
    <PasswordInput bind:value={password} />
  </FormGroup>
  <Button type="submit">Sign Up</Button>
</Form>
