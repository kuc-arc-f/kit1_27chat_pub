import { json } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public'
import LibCrypto from '../../lib/LibCrypto';
import LibConfig from '../../../../lib/LibConfig';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const retObj = {ret: "NG", message: "Internal Server Error.", data: {} };
    try {
        const reqObj = await request.json();
console.log(reqObj);
        console.log("path=", reqObj.path);
        const sendBody: any = JSON.stringify(reqObj);
        const res = await fetch(PUBLIC_API_URL +  reqObj.path, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},      
            body: sendBody
        });
        if (res.status !== 200) {
            throw new Error(await res.text());
        }        
        const resObj: any = await res.json();
        const hashed_password = LibCrypto.decrypt(resObj.data.password);
        //console.log("hashed_password=", hashed_password); 
        //console.log("password=", body.password);
        if (reqObj.password  !==  hashed_password) {
            throw new Error('Error , password');
        }  
        const user = resObj.data;
        user.password = "";
        retObj.ret = LibConfig.OK_CODE;
        retObj.data = user;
console.log("#json"); 
console.log(json);    
        return json(resObj);
    } catch (e) {
        console.error(e);
        return json(retObj);   
    }  
}
