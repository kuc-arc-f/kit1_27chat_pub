<svelte:head>
	<title>Test</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import LibDbSession from '$lib/LibDbSession';
import LibConfig from '$lib/LibConfig';
import { goto } from '$app/navigation';
import CrudCreate from './CrudCreate';

/**
* addItem
* @param
*
* @return
*/ 
const addItem = async function () {
	try {
	const result = await CrudCreate.addItem();
console.log(result);
	if(result) {
		goto(`/login`)
	}
/*
*/
  } catch (error) {
    console.error(error);
  }	
}
</script>

<!-- MarkUp -->
<div class="container text-column">
	<h1>User Create</h1>
	<hr />
	<div class="form-group col-sm-6">
	  <label>Name:
	  </label><br />
	  <input type="text" class="form-control" name="name" id="name" />
	  <label>Email:
	  </label><br />
	  <input type="text" class="form-control" name="email" id="email" />
	  <label>Password:
	  </label>
	  <input type="password" class="form-control" name="password" id="password" />
	</div>
	<hr />
	<button on:click={addItem} class="btn btn-primary">Create
	</button>
</div>
