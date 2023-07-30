<svelte:head>
	<title>Posts</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import LibConfig from '$lib/LibConfig';
import LibAuth from '$lib/LibAuth';
import { goto } from '$app/navigation';
import CrudCreate from '../CrudCreate';
/** @type {import('./$types').PageData} */
export let data;
console.log(data);

/**
 * addPost
 * @param
 *
 * @return
 */ 
const addPost = async function () {
console.log("add");
	try{
		const result = await CrudCreate.addItem();
console.log(result); 
		if(result) {
			goto(`/chats`)
		}
	} catch (e) {
      console.error(e);
      alert("error, add");
    }
}
</script>

<!-- MarkUp -->
<div class="container my-2">
	<a href={`/chats`} class="btn">[ Back ]
	</a>		
	<h1>Create</h1>
	<hr />
	<div class="col-sm-6">
		<label>Name:</label>
        <input type="text" name="name" id="name" class="form-control"
           />		
	</div>
	<button on:click={addPost} class="btn btn-primary my-2">Add</button>
	<hr />
</div>
