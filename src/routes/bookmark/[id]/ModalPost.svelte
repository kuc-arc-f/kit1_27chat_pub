<svelte:head>
	<title>Test</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import LibDbSession from '$lib/LibDbSession';
import LibAuth from '$lib/LibAuth';
import ChatPost from '../../chats/ChatPost';
import BookMark from '../../chats/BookMark';
import LibConfig from '$lib/LibConfig';
import LibCommon from '$lib/LibCommon';
import Thread from '../../chats/Thread';
//
export let userId: number = 0, post_id: number, post_body: string = "", 
postUserName: string = "", dateStr: string = "", postUserId: number,
chatId: number = 0, threadItems:any[] = [],
parentGetList: any;
//, postItem: any
console.log("#ModalPost.post");
console.log("post_id=", post_id);
/**
* loadProc
* @param
*
* @return
*/   
const loadProc = async function () {
    try {
        console.log("#loadProc.id=", post_id);
        userId = LibAuth.getUserId();
        let item = await ChatPost.get(Number(post_id));
console.log(item);
        post_body = item.body;
        postUserName = item.user_name;
        postUserId = item.userId;
        chatId = item.chatId;
        dateStr = LibCommon.converDatetimeString(item.createdAt);
        //
        await getThread();        
    } catch (e) {
        console.error(e);
    }  
}
loadProc();
 /**
  * getThread :
  * @param
  *
  * @return Promise<void>
  */
const getThread = async function () : Promise<void>
{
  try {
    threadItems = await Thread.getItems(post_id);
console.log(threadItems);    
  } catch (e) {
    console.error(e);
    alert("Error, getThread");
  }
}
/**
* createReply :
* @param
*
* @return Promise<void>
*/
const createReply = async function () : Promise<void>
{
  try {
    const body = document.querySelector<HTMLInputElement>('#modal_reply_body');
    const bodyString = body?.value;
//console.log(post_id, bodyString, chatId, postUserId);
    await Thread.create(post_id, bodyString, chatId, LibAuth.getUserId());
    await getThread();
    //@ts-ignore
    body.value = "";
  } catch (e) {
    console.error(e);
    alert("Error, createReply");
  }
}
/**
* childDeleteItem :
* @param
*
* @return Promise<void>
*/
const childDeleteItem = async function () : Promise<void>
{
  try {
    //console.log("user.id=", userId);
console.log("postUserId=", postUserId);
    await ChatPost.delete(post_id);
    //close
    const btn = document.getElementById("modal_close_button");
    btn?.click();
    await parentGetList(post_id);
  } catch (e) {
    console.error(e);
    alert("Error, childDeleteItem");
  }
}
/**
*
* @param
*
* @return Promise<void>
*/
const addBookMark = async function () : Promise<void>
{
  try {
console.log("postUserId=", postUserId);
    await BookMark.create(post_id, chatId, userId);
  } catch (e) {
    console.error(e);
    alert("Error, addBookMark");
  }
}

/**
* :
* @param
*
* @return Promise<void>
*/
const deleteThread = async function (id: number) : Promise<void>
{
  try {
console.log("deleteThread=", id);
    const result = await Thread.delete(id);
//console.log(result);
    await getThread();
  } catch (e) {
    console.error(e);
    alert("Error, deleteThread");
  }
}
</script>
<!-- CSS -->
<style>
</style>

<!-- ModalPost -->
<div class="chat_show_modal_body">
    <!-- Modal_body -->
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{postUserName} </h5>
        <span class="text-secondary mx-2">{dateStr}</span>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <p>{@html LibCommon.replaceBrString(post_body)}
        </p>
        <hr />
        ID: {post_id}
        <hr class="my-1" />
        <!-- replay_box -->
        <div class="row">
          <div class="col-sm-9"><textarea class="form-control" id="modal_reply_body" rows={3} />
          </div>
          <div class="col-sm-3">
            <button class="mt-2 btn btn-primary" on:click={() => createReply()} >
              Reply</button>
          </div>
        </div>  
        <!-- thread --> 
        {#each threadItems as item}
        <div>
          <div class="thread_user_name">
            <span class="fs-5">{item.user_name}: </span>{item.createdAt}
            <button class="mt-2 btn btn-sm btn-outline-secondary mx-2"
            on:click={() => deleteThread(item.thread_id)} >
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
          
          <p>{@html LibCommon.replaceBrString(item.body)}</p>
          <hr class="my-1" />
        </div>
        {/each}     
    </div>
    <div class="modal-footer">
        {#if (postUserId === userId)}
          <button type="button" class="btn btn-outline-danger" id="modal_post_btn_delete"
          on:click={() => childDeleteItem()}
          >Delete</button>            
        {/if}      
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal_close_button"
        >Close</button>
    </div>
    <!-- Modal_body_end -->
</div>

<!-- 
{item.body}
-->