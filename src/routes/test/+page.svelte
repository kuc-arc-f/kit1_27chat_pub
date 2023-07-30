<svelte:head>
	<title>Test</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import LibDbSession from '$lib/LibDbSession';
const TEST_KEY1 = "key1";
//
const testSet = async function () {
	try {
		const obj = {
			id: 1,
			name: "hoge123",
		}
		await LibDbSession.set(TEST_KEY1, obj);
	} catch (e) {
      console.error(e);
    }
}
//
const testGet = async function () {
    try {
        console.log("testGet");
        const d = await LibDbSession.get(TEST_KEY1);
        console.log(d);
    } catch (e) {
        console.error(e);
    }
}
</script>

<!-- MarkUp -->
<div class="text-column">
	<h1>Test</h1>
	<hr />
	<button on:click={testSet} class="btn btn-primary my-2">testSet
	</button>
	<button on:click={testGet} class="btn btn-primary my-2">testGet
	</button>

</div>
