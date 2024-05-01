<script lang="ts">
	import { Input, Label, Helper, Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	import './styles.css';

	type Response = {
		status: string;
		message: string;
	};

	export let data;
	export let onSubmit;

	let loading = false;
	let result: Response | null = null;

	const handleSubmit = async () => {
		try {
			loading = true;

			result = await onSubmit(data);
		} finally {
			loading = false;
		}
	};

	const handleBackToWelcome = () => {
		goto('/');
	};

	const handleBackToLogin = () => {
		data.challenge = 'start';
	};
</script>

<form class="login-form" on:submit={handleSubmit}>
	{#if data.challenge === 'start'}
		<div>
			<Label for="telegramId" class="mb-2">Telegram ID</Label>
			<Input
				required
				type="text"
				id="telegramId"
				placeholder="@nick"
				bind:value={data.telegramId}
			/>
		</div>

		<div>
			<Label for="password" class="mb-2">Password</Label>
			<Input required type="password" id="password" bind:value={data.password} />
		</div>

		{#if result}
			{#if result.status !== 'ok' && !!result.message}
				<div>
					<Helper color="red">{result.message}</Helper>
				</div>
			{/if}
		{/if}

		<Button on:click={handleBackToWelcome}>Back to Welcome</Button>
		<Button disabled={loading} type="submit">Start Login</Button>
	{:else if data.challenge === 'token'}
		<div>
			<Label for="telegramId" class="mb-2">Token</Label>
			<Input required type="text" id="token" bind:value={data.token} />
		</div>

		{#if result}
			{#if result.status !== 'ok' && !!result.message}
				<div>
					<Helper color="red">{result.message}</Helper>
				</div>
			{/if}
		{/if}

		<Button on:click={handleBackToLogin}>Back to Login</Button>
		<Button disabled={loading} type="submit">Login</Button>
	{/if}
</form>
