<script>
	import { page } from '$app/stores';
</script>

<header>
	{#if $page.route.id === '/'}
		<h1>Welcome Page</h1>
	{/if}

	{#if $page.route.id === '/(auth)/register'}
		<h1>Register Page</h1>
	{/if}

	{#if $page.route.id === '/(auth)/login'}
		<h1>Login Page</h1>
	{/if}

	{#if $page.route.id === '/(protected)/profile'}
		<h1>Profile Page</h1>
	{/if}
</header>

<style>
	header {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		width: 100%;

		margin-top: 16px;
	}
</style>
