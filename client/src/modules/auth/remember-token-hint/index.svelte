<script>
	import { Button, Card } from 'flowbite-svelte';

	import './styles.css';

	export let token;
	export let onBack;
</script>

<Card class="remember-token">
	<p>Please save the token and use it in future for login:</p>
	<h4>{token}</h4>

	<Button on:click={onBack}>Back</Button>
</Card>
