<script lang="ts">
	import { auth } from '$stores/auth';

	import Header from './Header.svelte';

	import '../app.pcss';
	import './styles.css';

	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	const { user } = data;

	$auth = { user };
</script>

<div class="app">
	<Header />

	<main>
		<slot></slot>
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
