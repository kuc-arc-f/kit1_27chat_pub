import LibConfig from '../LibConfig';
import Session from './ServerSession';
import ServerKV from './ServerKV';
//
const Auth = {
  /**
   * : cookie vallidate
   * @param key: any
   *
   * @return
   */ 
  validate: async function(Astro: any):Promise<void>
  {
    try {
      const key = LibConfig.COOKIE_KEY_AUTH;
//console.log(key);
      if (Astro.cookies.has(key) === false) {
          console.log("key = false, redirect Start");
          return Astro.redirect('/login');
      }
    } catch (e) {
      console.error(e);
    }
  },
  /**
   *
   * @param key: any
   *
   * @return
   */
  sessionValidate: async function(cookies: any):Promise<any>
  {
    try {
      let ret = false;
      const key = LibConfig.COOKIE_KEY_SESSION;
      const sessionId = cookies.get(key);
//console.log("sid=", sessionId);
      if(!sessionId) {
        console.error('Error , Auth.sessionValidate sessionId nothing ');
        return ret;
      }
      const obj = await  Session.get(LibConfig.SESSION_KEY_USER, sessionId);
//console.log(obj);
      if(!obj.id) {
        console.error('Error , nothing obj.id');
        return ret;
      }
      ret = true;
      return ret;
    } catch (e) {
      console.error(e);
    }
  }, 
  /**
   *
   * @param key: any
   *
   * @return
   */
  kvValidate: async function(cookies: any):Promise<any>
  {
    try {
      let ret = false;
      const key = LibConfig.COOKIE_KEY_SESSION;
      const sessionId = cookies.get(key);
//console.log("sid=", sessionId);
      if(!sessionId) {
        console.error('Error , Auth.kvValidate sessionId nothing ');
        return ret;
      }
      const obj = await  ServerKV.get(LibConfig.SESSION_KEY_USER, sessionId);
//console.log(obj);
      if(!obj.id) {
        console.error('Error , nothing obj.id');
        return ret;
      }
      ret = true;
      return ret;
    } catch (e) {
      console.error(e);
    }
  },  
}
export default Auth;
