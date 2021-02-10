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

export async function getServerSideProps(ctx) {
    const {token} = parseCookies(ctx);
    if(!token)
    {
        return {
            props:{
                products:[]
            }
        }
    }
    const res = await fetch("http://localhost:3000/api/cart",{
        headers:{
            "Authorization":token
        }
    })
    const products = await res.json();
    console.log("products",products)
    if(products.error)
    {
        return {
            props:{error: products.error}
        }
    }
    return {
        props:{products}
    }
}

export default Cart
