//import LibCookie from './LibCookie';
import LibConfig from '../LibConfig';
import HttpCommon from '../HttpCommon';
//
const Session = {
  /* put, get, delete */
  /**
  * 
  * @param
  *
  * @return
  */ 
  delete: async function(key: string): Promise<any>
  {
    try {
      let ret = false;
      const sid = this.getSessionId();
console.log("sid=", sid);      
      const item = {
        sessionId: sid,
        key: key,
      }
      const json = await HttpCommon.post(item, '/session/delete');
//console.log(json);
      ret = true;
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , delete');
    }
  }, 
  /**
  * 
  * @param
  *
  * @return
  */ 
  get: async function(key: string, sessionId: string): Promise<any>
  {
    try {
      let ret = {};
      const sid = sessionId;
//console.log("sid=", sid);      
      const item = {
        sessionId: sid,
        key: key,
      }
      const json = await HttpCommon.post(item, '/session/get');
//console.log(json);
      if (json.ret !== LibConfig.OK_CODE) {
        console.error("Error, json.ret <> OK");
        return ret;
      }
      ret = JSON.parse(json.data.value);
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , get');
    }
  },   
  /**
  * 
  * @param
  *
  * @return
  */ 
  put: async function(key: string, value: any): Promise<any>
  {
    try {
      let ret = false;
      const sid = this.getSessionId();
      const item = {
        sessionId: sid,
        key: key,
        value: value,
      }
//console.log("sid=", sid);     
/*
      const json = await HttpCommon.post(item, '/session/create');
console.log(json);      
      if (json.ret ===  LibConfig.OK_CODE) {
        ret = true;
      }       
*/ 
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , put');
    }
  },
  /**
  * 
  * @param
  *
  * @return
  */ 
  getSessionId: function(Astro: any): string
  {
    try {
      let ret = "";
//console.log("sid=", sid);
      const key = LibConfig.COOKIE_KEY_SESSION;
      if (Astro.cookies.has(key) === false) {
        console.error("Error, cookies.has = false");
        return ret;
      } else {
        const cookie = Astro.cookies.get(key);
        const seeeionValue = cookie.value;
        console.log("seeeionValue=", seeeionValue);
        ret = seeeionValue;
      }
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , getSessionId');
    }
  },
 
}
export default Session;
