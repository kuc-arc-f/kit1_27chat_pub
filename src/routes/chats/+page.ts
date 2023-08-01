import { dev } from '$app/environment';
//export const ssr = false;

import { error } from '@sveltejs/kit';
import LibAuth from '$lib/LibAuth';
import LibConfig from '$lib/LibConfig';
console.log(LibConfig.API_URL);
import CrudIndex from "./CrudIndex";

//type
type TPostItem = {
  id: number,
  title: string,
  content: string,
  createdAt: string,
  categoryName: string, 
}
const getList = async function (): Promise<any> 
{
  try {   
    let postItem: any[] = [];
    const items = await CrudIndex.getList();
    /*
    const url = LibConfig.API_URL + "/chats/index";
    const response = await fetch(url);
    const json = await response.json();
    postItem = json.data;
    */
//console.log(postItem);
    return items;
  } catch (e) {
    console.error(e);
  }
}
//
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  /*
    const validLogin: boolean = await LibAuth.validLogin();
    let items = [];
    if(validLogin !== false) {
    }
  */
//    const items = await getList();
//    console.log(items);
    return {
        items: [],
        validLogin: true,
    };
//    throw error(404, 'Not found');
  }
/*
*/