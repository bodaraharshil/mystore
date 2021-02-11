import React from 'react'
import { parseCookies } from 'nookies';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';

const Cart = ({error}) => {
    console.log("Error",error)
    const router = useRouter();
    if(error)
    {
        M.toast({html:error,classes:'red'})
        cookie.remove('user');
        cookie.remove('token');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        router.push('/login')
    }

    return (
        <div>
            <p>{error}</p>
            <h1>Cart page</h1>
        </div>
    )
}

export async function getStaticProps(context) {
    const {token} = parseCookies(context);
    if(!token)
    {
        return {
            props:{
                products:[]
            }
        }
    }
    const res = await fetch("http://localhost:3000/api/products",{
        headers:{
            "Authorization":token
        }
    })    
    const data = await res.json();
    if(data.error)
    {
        return {
            props:{error: data.error}
        }
    }
    return {
        props:{data}
    }
  }

export default Cart
