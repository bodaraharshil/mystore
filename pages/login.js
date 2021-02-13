import { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

import cookie from 'js-cookie';

const Login = () => {

    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handlesubmit = async(e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/api/login",{
             method:"POST",
             headers:{
                'Content-Type':'application/json'
             },
             body:JSON.stringify({
                 email,
                 password
             })
         })
         const data = await res.json();
         if(data.error)
         {
             M.toast({html:data.error,classes:"red"})
         }
         else
         {
            cookie.set('token',data.token);
            cookie.set('user',data.user)
            localStorage.setItem('token',data.token);
            localStorage.setItem('user',data.user.email);
            M.toast({html:data.message,classes:'green'})
             router.push("/")
         }
    }

    return (
        <div>
            <div className="container card authcard center-align">
                <h3>Login up</h3>
                <form onSubmit={(e) => handlesubmit(e)}>
                    <input type="email" placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> 
                    <input type="password" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /> 
                    <button className="btn waves-effect waves-light #1565c0 blue darken-3" type="submit" name="action">Login
                        <i className="material-icons right">forward</i>
                    </button>
                </form>
                <Link href="/signup"><a><h5>Dont have a account?</h5></a></Link>
            </div>
        </div>
    )
}

export default Login
