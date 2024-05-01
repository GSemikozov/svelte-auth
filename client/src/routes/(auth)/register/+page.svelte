<script lang="ts">
	import { goto } from '$app/navigation';

	import { authService } from '$services/auth';
	import RegisterForm from '$modules/auth/register-form/index.svelte';
	import RemeberTokenHint from '$modules/auth/remember-token-hint/index.svelte';

	type Data = {
		telegramId: string;
		password: string;
	};

	const data: Data = {
		telegramId: '',
		password: ''
	};

	let token = '';

	const handleBack = () => {
		goto('/');
	};

	const handleSubmit = async (formData: Data) => {
		const response = await authService.register(formData);

		if (response.status === 'ok') {
			token = response.result.token;
		}

		return response;
	};

	const handleResetToken = () => {
		token = '';
	};
</script>

<svelte:head>
	<title>Register</title>
	<meta name="description" content="profile" />
</svelte:head>

<section>
	{#if token}
		<RemeberTokenHint {token} onBack={handleResetToken} />
	{:else}
		<RegisterForm {data} onBack={handleBack} onSubmit={handleSubmit} />
	{/if}
</section>
