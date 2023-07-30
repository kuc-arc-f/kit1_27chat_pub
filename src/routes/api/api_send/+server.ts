import { json } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public'

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const retObj = {ret: "NG", message: "Internal Server Error."};
    try {
        const reqObj = await request.json();
        //console.log(reqObj);
        const sendBody: any = JSON.stringify(reqObj);
        const res = await fetch(PUBLIC_API_URL +  reqObj.path, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},      
            body: sendBody
        });
        if (res.status !== 200) {
            console.error("Error, HTTP <> 200");
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
