<script>
	import { Button } from 'flowbite-svelte';

	import { authService } from '$services/auth';
	import AuthForm from '$modules/auth/auth-form/index.svelte';
	import RemeberTokenHint from '$modules/auth/remember-token-hint/index.svelte';

	let data = {
		telegramId: '',
		password: ''
	};

	let token = '';

	const handleSubmit = async () => {
		const response = await authService.register(data);

		token = response.result.token;
	};

	const handleResetToken = () => {
		token = '';
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="register" />
</svelte:head>

<section>
	{#if token}
		<RemeberTokenHint {token} onBack={handleResetToken} />
	{:else}
		<AuthForm {data} onSubmit={handleSubmit} />
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
