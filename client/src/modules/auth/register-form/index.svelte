<script lang="ts">
	import { Input, Label, Button, Helper } from 'flowbite-svelte';

	import './styles.css';

	type Response = {
		status: string;
		message: string;
	};

	export let data;
	export let onBack;
	export let onSubmit;

	let loading = false;
	let response: Response | null = null;

	const handleSubmit = async () => {
		try {
			loading = true;

			response = await onSubmit(data);
		} finally {
			loading = false;
		}
	};
</script>

<form class="register-form" on:submit={handleSubmit}>
	<div>
		<Label for="telegramId" class="mb-2">Telegram ID</Label>
		<Input required type="text" id="telegramId" placeholder="@nick" bind:value={data.telegramId} />
	</div>

	<div>
		<Label for="password" class="mb-2">Password</Label>
		<Input required type="password" id="password" bind:value={data.password} />
	</div>

	{#if response}
		{#if response.status !== 'ok' && !!response.message}
			<div>
				<Helper color="red">{response.message}</Helper>
			</div>
		{/if}
	{/if}

	<Button on:click={onBack}>Back</Button>
	<Button disabled={loading} type="submit">Register</Button>
</form>
