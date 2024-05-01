<script>
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	import './welcome.css';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="register" />
</svelte:head>

<section>
	<div class="welcome">
		<div class="action">
			<Button on:click={() => goto('/register')}>Go to Register</Button>
		</div>

		<div class="action">
			<Button on:click={() => goto('/login')}>Go to Profile</Button>
		</div>
	</div>
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
