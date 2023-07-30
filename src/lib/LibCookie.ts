import moment from 'moment'
//
const LibCookie = {
  /**
  * setCookie
  * @param key: string
  *
  * @return Promise<any>
  */    
  setCookie: function(key: string | undefined, value: string) {
    try{
      const dt = moment().add(10, 'year').toDate().toUTCString()

//      console.log( dt );
      document.cookie = `${key}=${value}; path=/; expires=${dt}`;
    } catch (e) {
      console.log(e);
      throw new Error('error, set_cookie');
    }
  },
  /**
  * getCookie
  * @param key: string
  *
  * @return Promise<any>
  */  
  getCookie: function(key: any){
    try{
      let ret: null|string = null
      const cookieValue = document.cookie.split('; ')
      .find(row => row.startsWith(key))
// console.log(typeof cookieValue)
      if(typeof cookieValue != 'undefined'){
        ret = cookieValue.split('=')[1];
      }
      return ret
    } catch (e) {
      console.log(e);
      throw new Error('error, getCookie');
    }
  },
  /**
  * deleteCookie
  * @param key: string
  *
  * @return Promise<any>
  */    
  deleteCookie: function(key:string){
    try{
      document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    } catch (e) {
      console.log(e);
      throw new Error('error, deleteCookie');
    }
  },
}
export default LibCookie
