import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Signup = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();

    const handlesubmit = async(e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:3000/api/signup`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
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
            M.toast({html:data.message,classes:'green'})
            router.push("/login")
        }
    }

    return (
        <div>
            <div className="container card authcard center-align">
                <h3>Sign up</h3>
                <form onSubmit={(e) =>handlesubmit(e)}>
                    <input type="text" placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    /> 
                    <input type="email" placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> 
                    <input type="password" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /> 
                    <button className="btn waves-effect waves-light #1565c0 blue darken-3" type="submit" name="action">Signup
                        <i className="material-icons right">forward</i>
                    </button>
                </form>
                <Link href="/login"><a><h5>Already have a account?</h5></a></Link>
            </div>
        </div>
    )
}

export default Signup
