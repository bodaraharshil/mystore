import {parseCookies} from 'nookies';
import { useEffect,useRef } from 'react';
import UserRole from '../components/UserRole';

const Account = ({orders}) => {
    const ordercart  = useRef(null);
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    useEffect(() => {
        M.Collapsible.init(ordercart.current);
    }, [])
    const OrderHistory = () => {
        return(
            <ul className="collapsible" ref={ordercart}>
               {
                   Object.values(orders).map(item => {
                       return (
                        <li key={item._id}>
                            <div className="collapsible-header"><i className="material-icons">folder</i>{item.createdAt}</div>
                            <div className="collapsible-body">
                                <h5>Total ₹ {item.total}</h5>
                                {
                                    item.products.map(pitem => {
                                        return (
                                            <h6>{pitem.product.name} * {pitem.qty}</h6>
                                        )
                                    })
                                }
                            </div>
                        </li>
                       )
                   })
               }
          </ul>
        )
    }
    
    return (
        <div className="container">
            <div className="center-align white-text" style={{marginTop:"10px",backgroundColor:"#1565c0",padding:'3px'}}>
                <h5>{user.name}</h5>
                <h5>{user.email}</h5>
            </div>
                <h4>Order History</h4>
                {
                    orders.length == 0 ?
                    <h6>Your have no order history</h6>
                    :
                    <OrderHistory/>
                }
                <UserRole/>
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
    const res = await fetch("http://localhost:3000/api/order",{
        headers:{
            "Authorization":token
        }
    })    
    const data = await res.json();
    return {
        props:{
            orders:data.Orders
        }
    }
}

export default Account
