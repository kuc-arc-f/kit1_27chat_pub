import LibCookie from '$lib/LibCookie';
import LibConfig from '$lib/LibConfig';
//
const LibAuth = {
    /**
     *
     * @param key: any
     *
     * @return
     */ 
    getUserId: function(): any
    {
      try {
        let ret = null;
        const key = LibConfig.COOKIE_KEY_USER;
        const auth = LibCookie.getCookie(key);
        if(!auth) {
          throw new Error('Error , user cookie nothing.');
        } 
        ret = Number(auth); 
        return ret;    
      } catch (e) {
        console.error(e);
      }
    },
}
export default LibAuth;
