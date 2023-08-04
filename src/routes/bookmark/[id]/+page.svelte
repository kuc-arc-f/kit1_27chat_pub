<svelte:head>
<title>Posts</title>
<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import LibConfig from '$lib/LibConfig';
import LibCommon from '$lib/LibCommon';
import LibChatPost from '$lib/LibChatPost';
import LibDbSession from '$lib/LibDbSession';
import ChatPost from '../../chats/ChatPost';
import Chat from '../../chats/Chat';
import Thread from '../../chats/Thread';
import BookMark from '../../chats/BookMark';
//import ModalPost from './ModalPost.svelte';
//
const postCfg= LibChatPost.get_params()
const chatParams = {
  INIT_TIME : new Date(),
  STAT : postCfg.STATE_ACTIVE,
  STAT_DISPLAY : postCfg.STATE_DISPLAY_ACTIVE,
  REMAIN_TIME : 0,
}
/** @type {import('./$types').PageData} */
export let data: any, chat_posts: any[] = [], DATA = chatParams, chat: any = {id: 0, name:""},
post_id = 0, modal_display = false, mTimeoutId: any = 0, user:any = {}, lastCreateTime: string = "";
let id = 0;
let items = [];
//
console.log("[id]start.id=", data.id);
id = Number(data.id);
//console.log(data);
/**
* addItem
* @param
*
* @return
*/
async function addItem(){
    try {
        const result = await ChatPost.addItem(data.id);
console.log(result);        
        items = await ChatPost.getList(data.id);
console.log(items);        

    } catch (error) {
        console.error(error);
    }    
}
//
const startProc= async function() {
    try{
        items = data.items;
        console.log(items);
        const chatData = await Chat.get(Number(id));
        chat = chatData;
console.log(chatData);
    } catch (e) {
    console.error(e);
    }
}
startProc();
/**
 * parentGetList
 * @param
 *
 * @return
 */
 const parentGetList = async function (chat_id: number) {
    try {
//console.log("parentGetList=", chat_id);
        items = await ChatPost.getList(Number(id));
//console.log(items);
        chat_posts = items;
    } catch (e) {
        console.error(e);
    }    
}
/**
 *
 * @param
 *
 * @return
 */
const deleteBookmark = async function (bookmark_id: number) {
    try {
console.log("deleteBookmark=" , bookmark_id);
        await BookMark.delete(bookmark_id);
        items = await BookMark.getItems(id);
    } catch (e) {
        console.error(e);
    }    
}
</script>

<!-- CSS -->
<style>
.chat_show_modal_wrap #open_post_show { display: none ;}
</style>

<!-- MarkUp -->
<div class="container my-0">
    <div class="row">
        <div class="col-sm-6">
            <h3>BookMark : {chat.name}</h3>
            ID: {data.id}
        </div>
        <div class="col-sm-6 text-center pt-3">
            <a href={`/chats/${id}`} class="btn btn-outline-primary">Post</a>
        </div>
    </div>
    <hr class="my-2" />
    {#each items as item}
    <div>
        <h5>{item.user_name}</h5>
        <hr class="my-1" />
        <p>{@html LibCommon.replaceBrString(item.body)}</p>
        <p>{LibCommon.converDateString(item.createdAt)}, ID: {item.bookmark_id}
        <button class="btn btn-sm btn-outline-primary mx-2" on:click={deleteBookmark(item.bookmark_id)}>Delete</button>
        </p>
        <hr />
    </div>
    {/each}  
</div>

<!--
--->
