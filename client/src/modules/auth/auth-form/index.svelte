<script>
	import { Input, Label, Button } from 'flowbite-svelte';

	import './styles.css';

	export let data;
	export let onSubmit;

	let loading = false;

	const handleSubmit = async () => {
		loading = true;

		await onSubmit();

		loading = false;
	};
</script>

<form class="auth-form" on:submit={handleSubmit}>
	<div>
		<Label for="telegramId" class="mb-2">Telegram ID</Label>
		<Input required type="text" id="telegramId" placeholder="@nick" bind:value={data.telegramId} />
	</div>

	<div>
		<Label for="password" class="mb-2">Password</Label>
		<Input required type="password" id="password" bind:value={data.password} />
	</div>

	<Button disabled={loading} type="submit">Register</Button>
</form>
