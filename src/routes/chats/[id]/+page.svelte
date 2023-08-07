<svelte:head>
<title>Posts</title>
<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import LibConfig from '$lib/LibConfig';
import LibCommon from '$lib/LibCommon';
import LibChatPost from '$lib/LibChatPost';
import LibDbSession from '$lib/LibDbSession';
import CrudIndex from '../CrudIndex';
//import LibTimer from '$lib/LibTimer';
//import LibNotify from '$lib/LibNotify';
import LibCookie from '$lib/LibCookie';
import ChatPost from '../ChatPost';
import Chat from '../Chat';
import ModalPost from './ModalPost.svelte';
import PaginateBox from '$lib/components/PaginateBox.svelte';
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
let items = [], itemsAll = [], itemPage = 1, perPage: number = 100;
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
/**
 * clickClear
 * @param
 *
 * @return
 */
const clickClear = async function() {
    try{
        const searchKey = document.querySelector<HTMLInputElement>('#searchKey');
        // @ts-ignore
        if(searchKey) {
            searchKey.value = "";
        }
        items = await ChatPost.getList(id);
    } catch (e) {
        console.error(e);
        throw new Error('Error , clickClear');
    }    
}
/**
*
* @param
*
* @return
*/
async function clickSearch(){
    try {
        const searchKey = document.querySelector<HTMLInputElement>('#searchKey');
        const skey = searchKey?.value;
console.log("search:", skey);
        //@ts-ignore
        items = await ChatPost.search(id, skey);
//console.log(items);
        chat_posts = items;
    } catch (error) {
        console.error(error);
    }    
}
/**
*
* @param
*
* @return
*/
const startProc= async function() {
    try{
        const key = LibConfig.COOKIE_KEY_LAST_CHAT;
        LibCookie.setCookie(key, String(id));
        itemsAll = data.items;
        items = await CrudIndex.getPageList(itemsAll, itemPage, perPage);
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
 * parentShow
 * @param
 *
 * @return
 */
 const parentShow = function (id: number)
{
    try {
console.log("parentShow=", id)
        post_id = id;
        modal_display = false;
        const timer = 100;
        setTimeout(() => {
            console.log("parentShow=", id);
            modal_display = true;
            const btn = document.getElementById("open_post_show");
            btn?.click();
        }
        , timer);
    } catch (e) {
        console.log(e);
    }
}
/**
*
* @param
*
* @return
*/ 
const parentUpdateList = async function(page: number) {
  console.log("parentUpdateList=", page);
  itemPage = page;
  items = await CrudIndex.getPageList(itemsAll, page, perPage);
  console.log(items);
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
            <h1>{chat.name}</h1>
            ID: {data.id}
        </div>
        <div class="col-sm-6 text-center pt-3">
            <a href={`/thread/${id}`} class="btn btn-outline-primary">Thread</a>
            <a href={`/bookmark/${id}`} class="btn btn-outline-primary">Bookmark</a>
        </div>
    </div>
    <hr class="my-1" />
    <div class="row">
        <div class="col-sm-9">
        <textarea class="form-control" name="body" id="body" rows="3" />
        </div>
        <div class="col-sm-3">
            <button class="mt-2 btn btn-outline-primary" on:click={addItem} >
            Post</button>
        </div>
    </div>
    <hr class="my-1" />
    <div class="row">
        <div class="col-md-12 pt-1">
            <button class="btn btn-sm btn-outline-primary" on:click={() => clickClear()} 
            >Clear</button>
            <span class="search_key_wrap">
                <input type="text" size="36" class="mx-2 " name="searchKey"
                 id="searchKey" placeholder="Search Key">
            </span>
            <button class="btn btn-sm btn-outline-primary" on:click={() => clickSearch()}>Search</button>
        </div>
    </div>
    <hr class="my-1" />
    {#each items as item}
    <div>
        <h5>{item.user_name}</h5>
        <hr class="my-1" />
        <p>{@html LibCommon.replaceBrString(item.body)}</p>
        <p>{LibCommon.converDateString(item.createdAt)}, ID: {item.id}
        </p>
        <button on:click={parentShow(item.id)}
        class="btn btn-sm btn-outline-primary">Show</button>
        <hr />
    </div>
    {/each} 
    <!-- paginate -->
    <PaginateBox  itemPage={itemPage} parentUpdateList={parentUpdateList} /> 
    <!-- Modal -->
    <div class="chat_show_modal_wrap">
        <button type="button" class="btn btn-primary" id="open_post_show"
        data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal
       </button>
        <div class="modal fade" id="exampleModal" tabindex="-1"
          aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    {#if modal_display}
                    <ModalPost post_id={post_id} parentGetList={parentGetList} />
                    {/if}
                </div>
            </div>
        </div>    
    </div>
</div>

<!--

--->
