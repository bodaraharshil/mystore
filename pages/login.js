import { useState } from 'react'
import Link from 'next/link';

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    return (
        <div>
            <div className="container card authcard center-align">
                <h3>Login up</h3>
                <form>
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
