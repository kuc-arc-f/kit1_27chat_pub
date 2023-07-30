//import LibCookie from './LibCookie';
import LibConfig from '../LibConfig';
import HttpKv from '../HttpKv';
//
const ServerKV = {
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
//console.log("sid=", sid);      
      const item = {
        key: sessionId + ":" + key,
      }
      const json = await HttpKv.post(item, '/get');
console.log(json);
      if (json.ret !== LibConfig.OK_CODE) {
        console.error("Error, json.ret <> OK");
        return ret;
      }
      ret = JSON.parse(json.data);
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , get');
    }
  },   

 
}
export default ServerKV;
