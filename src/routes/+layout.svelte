<script>
import Navi from './Navi.svelte';
//	import './styles.css';
</script>

<Navi />
<div class="app app_root_wrap bg-white">
	<main>
		<slot />
	</main>

</div>

<!-- CSS -->
<style>
.app_root_wrap{ margin-top: 63px; }
</style>

<!--
<footer>
</footer>
<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
-->