export const ssr = false;
import { error } from '@sveltejs/kit';
import LibConfig from '$lib/LibConfig';
//import ChatPost from '../../chats/ChatPost';
import BookMark from '../../chats/BookMark';
//type
type IPostItem = {
  id: number,
  title : string,
  content : string,
  category : string,
  createdAt: string,
}
/**
* getItem
* @param
*
* @return
*/   
const getItem = async function(id: number) {
  try {
    const items = await BookMark.getItems(id);
    return items;
  } catch (e) {
    console.error(e);
  }
}
//
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  try{
    console.log("id=", params.id);
    const items: any[] = await getItem(params.id);
    return {
        id: params.id,
        items: items,
    };  
  } catch (e) {
    console.error(e);
    throw new Error('Error , load');
  }
//    throw error(404, 'Not found');
}
/*
*/