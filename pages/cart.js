import React,{useState} from 'react'
import { parseCookies } from 'nookies';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import StripeCheckout from 'react-stripe-checkout';
import Link from 'next/link';

const Cart = ({error,data}) => {
    const {token} = parseCookies();
    const router = useRouter();
    const [cProduct,setCartProduct] = useState(data);
    let price=0;
    if(!token)
    {
        return(
            <div className="center-align">
                <h3>Please Login to view your cart</h3>
                <Link href="/login"><button className="btn #1565c0 blue darken-3">Login</button></Link>
            </div>
        )
    }
    if(error)
    {
        M.toast({html:error,classes:'red'})
        cookie.remove('user');
        cookie.remove('token');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        router.push('/login')
    }

    const handleremove = async(pid) => {
        const res = await fetch(`http://localhost:3000/api/cart`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":token
            },
            body:JSON.stringify({
                productId:pid
            })
        })
        const data = await res.json();
        setCartProduct(data)
    }

    const CartItems = () => {
        return (
            <>
            {
                Object.values(cProduct).map(item =>{
                    price = price + item.qty * item.product.price
                    return (
                        <div style={{display:'flex',margin:"20px"}} key={item._id}>
                            <img src={item.product.mediaurl} style={{width:"30%"}}/>
                            <div style={{margin:'20px'}}>
                                <h6>{item.product.name}</h6>
                                <h6>{item.qty} * {item.product.price}</h6>
                                <button className="btn red" onClick ={()=>handleremove(item.product._id)}>remove</button>
                            </div>
                        </div>
                    )
                })
            }
            </>
        )
    }

    const handleCheckout = async(paymentInfo) => {
        const res = await fetch(`http://localhost:3000/api/payment`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":token
            },
            body:JSON.stringify({
                paymentInfo
            })
        })
        const data = await res.json();
        if(data.error)
        {
            M.toast({html:data.error,classes:"red"})
        }
        else
        {
            M.toast({html:data.message,classes:"green"})
            router.push("/");
        }
    }

    const TotalPrice = () => {
        return(
            <div className="container"  style={{display:'flex',justifyContent:"space-between"}}>
                <h5>Total ₹ {price}</h5>
                {data.length != 0 ?
                <StripeCheckout
                    name="My store"
                    amount={price*100}
                    image={data.length > 0 ? data[0].product.mediaurl :"" }
                    currency="INR"
                    shippingAddress={true}
                    billingAddress={true}
                    zipCode={true}
                    stripeKey="pk_test_51IKM7hKrEzRlezT44edQI6nHYdUuUrgXSBInusN0qN8989ptaY9wstDhl5JJBmvjrY40EYq0hpZXvitpXhQSa42800pjJv1pbF"
                    token={(paymentInfo) => handleCheckout(paymentInfo)}
                >
                    <button className="btn">Checkout</button>
                </StripeCheckout>
                :null }
            </div>
        )
    }

    return (
        <div className="container">
            <CartItems/>
            <TotalPrice/>
        </div>
    )
}

export async function getServerSideProps(context) {
    const {token} = parseCookies(context);
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
