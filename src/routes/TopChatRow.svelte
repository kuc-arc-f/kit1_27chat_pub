<script lang="ts">
import { page } from '$app/stores';
import LibCookie from '$lib/LibCookie';
import LibConfig from '$lib/LibConfig';
//import LibChat from '$lib/LibChat';
import Chat from './chats/Chat';

export let data: any, chatData: any = {id: 0, name: ""};
let recentdisplay = false;

//
const initPage = async function(): Promise<any>
{
	try {
		const key = LibConfig.COOKIE_KEY_LAST_CHAT;
		const chatId = LibCookie.getCookie(key);
		if(chatId !== null){
			chatData = await Chat.get(Number(chatId));
//console.log(chatData);
			recentdisplay = true;
		}         
	} catch (e) {
		console.error(e);
	}
}
initPage();
</script>

<!-- MarkUp -->
<div>
	<h3>Recent Chat</h3>
	<hr />
	{#if recentdisplay}
	<a class="nav-link active" aria-current="page" href={`/chats/${chatData.id}`}>
		<span class="task_title fs-5"><h3 class="py-1">{chatData.name}</h3>
		</span>
		<span>ID: {chatData.id}</span>
		<button class="btn btn-sm btn-outline-primary mx-2">Open
		</button>		
	</a>
	<hr />
	{/if}

</div>
