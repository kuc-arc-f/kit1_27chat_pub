<script lang="ts">
import { page } from '$app/stores';
import LibCookie from '$lib/LibCookie';
import LibConfig from '$lib/LibConfig';
import LibChat from '$lib/LibChat';

export let data: any, chatData: any = {id: 0, name: ""};
//
const initPage = async function(): Promise<any>
{
	try {
		const key = LibConfig.COOKIE_KEY_LAST_CHAT;
		const chatId = LibCookie.getCookie(key);
		if(chatId !== null){
			chatData = await LibChat.get(Number(chatId));
console.log(chatData);
		}         
console.log("chatId", chatId);
	} catch (e) {
		console.error(e);
	}
}
initPage();
///chats/49
</script>

<!-- MarkUp -->
<div>
	<h3>Recent Chat</h3>
	<hr />
	<a class="nav-link active" aria-current="page" href={`/chats/${chatData.id}`}>
		<span class="task_title fs-5"><h3 class="py-1">{chatData.name}</h3>
		</span>
		<span>ID: {chatData.id}</span>
		<button class="btn btn-sm btn-outline-primary mx-2">Open
		</button>		
	</a>
</div>
