<svelte:head>
	<title>Test</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import { goto } from '$app/navigation';
import LibConfig from '$lib/LibConfig';
import LibCookie from '$lib/LibCookie';
import Session from '$lib/Session';
//import { PUBLIC_BASIC_AUTH_USER, PUBLIC_BASIC_AUTH_PASSWORD } from '$env/static/public'
import { PUBLIC_API_KEY } from '$env/static/public';

/**
* login
* @param
*
* @return
*/ 
const login = async function () {
    try {
//console.log("PUBLIC_BASIC_AUTH_USER=", PUBLIC_BASIC_AUTH_USER);
        const email = document.querySelector<HTMLInputElement>('#email');		
        const password = document.querySelector<HTMLInputElement>('#password');
console.log(email?.value);
console.log(password?.value);
		const item = {
			email: email?.value,
			password: password?.value,
			path: "/users/get",
			"api_key": PUBLIC_API_KEY
		}
//console.log(item);
		const body = JSON.stringify(item);		
		const res = await fetch("/api/user/login", {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},      
			body: body
		});
		const json = await res.json()
//console.log(json);
		if(json.ret === LibConfig.OK_CODE) {
            const key = LibConfig.COOKIE_KEY_USER;  
            await LibCookie.setCookie(key, json.data.id); 
            goto(`/`);
            /*
            const sessionKey = LibConfig.SESSION_KEY_USER; 
            let resulte = await Session.put(sessionKey, JSON.stringify(json.data)); 
console.log(resulte);
            if(resulte) {
    			goto(`/`);
            }                       
            */
		} else {
            alert("Error, Login");
        }
    } catch (error) {
        console.error(error);
    }  
}
</script>

<!-- MarkUp -->
<div class="container text-column">
    <h1>Login</h1>
    <div class="form-group col-sm-6">
        <label>Email:
        </label><br />
        <input type="text" class="form-control" name="email" id="email" />
        <label>Password:
        </label>
        <input type="password" class="form-control" name="password" id="password" />
    </div>
    <hr />
    <button on:click={login} class="btn btn-primary">Login</button>
    <hr />	
    <hr />
    <a href="/users/create">[ User-Create ]
    </a>
</div>
