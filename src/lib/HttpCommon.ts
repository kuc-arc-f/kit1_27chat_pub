//import LibCookie from './LibCookie';
import LibConfig from './LibConfig';
import { PUBLIC_API_KEY } from '$env/static/public'
import { PUBLIC_API_URL } from '$env/static/public'

//
const HttpCommon = {
  /**
  * 
  * @param
  *
  * @return
  */ 
  post: async function(item: any, path: string): Promise<any>
  {
    try {
      const url = PUBLIC_API_URL;
      const apiKey = PUBLIC_API_KEY;
console.log(url, path);
      item.api_key = apiKey;
console.log(item);   
      const body: any = JSON.stringify(item);		
      const res = await fetch(url + path, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
//console.log(json);   
      if (res.status !== 200) {
        throw new Error(await res.text());
      }
      if (json.ret !==  LibConfig.OK_CODE) {
        console.error(json);
        throw new Error("Error, json.ret <> OK");
      } 
      return json;
    } catch (e) {
      console.error(e);
      throw new Error('Error , post');
    }
  }, 
  /**
  * 
  * @param
  *
  * @return
  */ 
  server_post: async function(item: any, path: string): Promise<any>
  {
    try {
      const url = PUBLIC_API_URL;
      const apiKey = PUBLIC_API_KEY;
//console.log("#getList.apiKey=" + apiKey);
      item.api_key = apiKey;
      item.path = path;
console.log(item);
      const body: any = JSON.stringify(item);	
      const res = await fetch("/api/api_send", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
      if (res.status !== 200) {
        console.log(json);   
        throw new Error(await res.text());
      }
      if (json.ret !==  LibConfig.OK_CODE) {
        throw new Error("Error, json.ret <> OK");
      } 
      return json;
    } catch (e) {
      console.error(e);
      throw new Error('Error , post');
    }
  },  
}
export default HttpCommon;
