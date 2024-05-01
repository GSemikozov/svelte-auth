<script>
	import { Listgroup, ListgroupItem, Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	import { auth } from '$stores/auth';

	import './styles.css';

	const handleLogout = () => {
		$auth = { user: null };

		document.cookie = 'accessToken=; max-age=0';

		goto('/');
	};
</script>

<svelte:head>
	<title>Profile</title>
	<meta name="description" content="profile" />
</svelte:head>

<section>
	{#if $auth.user !== null}
		<div class="profile">
			<Listgroup>
				<ListgroupItem>ID: {$auth.user.id}</ListgroupItem>
				<ListgroupItem>telegramId: {$auth.user.telegramId}</ListgroupItem>
			</Listgroup>

			<Button on:click={handleLogout}>Logout</Button>
		</div>
	{/if}
</section>
