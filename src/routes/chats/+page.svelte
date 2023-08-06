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
    <div class="row">
        <div class="col-sm-6"><h1>Chat</h1>
        </div>
        <div class="col-sm-6 text-end pt-1">
			<a href={`/chats/create`} class="btn btn-primary">Create
			</a>		
        </div>
    </div>
	<hr class="my-1" />
	{#each items as item}
	<div>
		<div class="pb-2">
			<a href={`/chats/${item.id}`} ><h3>{item.name}</h3></a>		
		</div>
		<p>ID : {item.id}
			<a href={`/chats/${item.id}`} class="btn btn-sm btn-outline-primary ms-2">Show
			</a>		
			<a href={`/thread/${item.id}`} class="btn btn-sm btn-outline-primary mx-2">Thread
			</a>		
			<a href={`/bookmark/${item.id}`} class="btn btn-sm btn-outline-primary">Bookmark
			</a>
		</p>		
		<hr class="my-1" />
	</div>
	{/each}	
</div>
<!-- 
<h3>{item.name}</h3>
-->