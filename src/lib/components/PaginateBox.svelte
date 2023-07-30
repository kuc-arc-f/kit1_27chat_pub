<svelte:head>
</svelte:head>

<script lang="ts">
import { goto } from '$app/navigation';
import LibAuth from '$lib/LibAuth';
import HttpCommon from '$lib/HttpCommon';

/** @type {import('./$types').PageData} */
export let itemPage: any, parentUpdateList;
console.log("itemPage=", itemPage);
//
const nextButton = async function() {
    parentUpdateList(itemPage + 1);
}
//
const beforeButton = async function() {
    parentUpdateList(itemPage - 1);
}
</script>

<!-- MarkUp -->
<div class="text-center">
    {#if (itemPage > 1)}
        <button class="btn btn-outline-primary" on:click={beforeButton}> ＜ </button>
    {/if}
    <button class="btn btn-outline-primary" on:click={nextButton}> ＞ </button>
</div>

<!-- 
<h3>paginate</h3>
-->