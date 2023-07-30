<svelte:head>
	<title>Posts</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import CrudIndex from "./CrudIndex";

/** @type {import('./$types').PageData} */
export let data: any, items = [];
//console.log(data);
/**
 * start proc
 * @param
 *
 * @return
 */ 
const startProc= async function() {
	items = await CrudIndex.getList();
//	console.log(items);
}
startProc();
</script>

<div class="container my-2">
	<h1>Chat</h1>
	<hr />
	<a href={`/chats/create`} class="btn btn-primary">Create
	</a>
  
	<hr />
	{#each items as item}
	<div>
		<h3>{item.name}</h3>
		<p>ID : {item.id}</p>
		<a href={`/chats/${item.id}`} class="btn btn-outline-primary">Show
		</a>		
		<hr />
	</div>
	{/each}	
</div>
<!-- 
<a href={`/chats/edit/${item.id}`} class="btn">[ Edit ]
</a>		
-->