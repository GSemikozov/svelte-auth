<script lang="ts">
	import { goto } from '$app/navigation';

	import { authService } from '$services/auth';
	import AuthForm from '$modules/auth/login-form/index.svelte';

	type Data = {
		challenge: 'start' | 'token';

		telegramId: string;
		password: string;
		token: string;
	};

	let data: Data = {
		challenge: 'start',

		telegramId: '',
		password: '',
		token: ''
	};

	const handleBack = () => {
		goto('/');
	};

	const handleSubmit = async (formData: Data) => {
		if (formData.challenge === 'start') {
			const response = await authService.startLoginChallenge(formData);

			if (response.status === 'ok') {
				data.challenge = 'token';
			}

			return response;
		}

		if (formData.challenge === 'token') {
			const response = await authService.login(formData);

			if (response.status === 'ok') {
				document.cookie = `accessToken=${response.result.jwtToken}; path=/`;

				window.location.href = '/profile';
			}

			return response;
		}
	};
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="profile" />
</svelte:head>

<section>
	<AuthForm {data} onSubmit={handleSubmit} />
</section>
