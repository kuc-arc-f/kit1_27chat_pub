<script lang="ts">
import TopChatRow from './TopChatRow.svelte';
import LibAuth from '$lib/LibAuth';
const uid = LibAuth.getUserId();
console.log("uid=", uid);
</script>

<!-- MarkUp -->
<div class="container">
    <p>UserId: {uid}</p>
    <TopChatRow></TopChatRow>
</div>

<!--
<hr />
<h1>Welcome to SvelteKit</h1>
-->