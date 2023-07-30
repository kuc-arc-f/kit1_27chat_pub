import { json } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public'
//import { PUBLIC_API_KEY } from '$env/static/public'
import LibCrypto from '../../lib/LibCrypto';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const retObj = {ret: "NG", message: "Internal Server Error."};
    try {
        const reqObj = await request.json();
//console.log(reqObj);
        console.log("path=", reqObj.path);
        const hashed_password = LibCrypto.encode(reqObj.password);
//console.log("hashed_password=", hashed_password);  
        reqObj.password = hashed_password;
        const sendBody: any = JSON.stringify(reqObj);
        const res = await fetch(PUBLIC_API_URL +  reqObj.path, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},      
            body: sendBody
        });
        if (res.status !== 200) {
            throw new Error(await res.text());
        }        
        const resObj = await res.json();
//console.log("#json"); 
//console.log(json);    
        return json(resObj);
    } catch (e) {
        console.error(e);
        return json(retObj);   
    }  
}
