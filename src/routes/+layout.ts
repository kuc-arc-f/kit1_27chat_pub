import LibCookie from '$lib/LibCookie';
import LibConfig from '$lib/LibConfig';
export const ssr = false;
//
export async function load({ params, url }) {
//console.log("#+layout.ts");
  if(url.pathname !== '/login') {
//console.log(url.pathname);
    if(typeof(window) !== "undefined") {
      const key = LibConfig.COOKIE_KEY_USER;
      const auth = LibCookie.getCookie(key);
console.log(key, auth);
      if(typeof auth === "undefined" || auth === null)
      {
        location.href = '/login';
      }
    }
  }
  return {
    items: []
  };
}