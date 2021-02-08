import { Router } from 'next/router';
import {parseCookies} from 'nookies';

const Account = () => {
    return (
        <div>
            <h1>OPOPOP</h1>            
        </div>
    )
}

export async function getServerSideProps(ctx)
{
    const {token} = parseCookies(ctx);
    if(!token)
    {
        const {res} = ctx;
        res.writeHead(302,{Location:"/login"});
        res.end();
    }
    return{
        props:{

        }
    }
}

export default Account
