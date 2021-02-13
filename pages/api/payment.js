import Stripe from 'stripe';
import initDB from '../../helpers/initDB';
import Cart from '../../models/cart';
import JWT from 'jsonwebtoken';
import Order from '../../models/order';


initDB();
const stripe = Stripe("sk_test_51IKM7hKrEzRlezT45TzqafcE8jQ8Zge14boymd3Z2ZklZVnbxshxRtZsOSJHDRyFjkbsW4hFSfuQOnYlCdEO7Jl500VlmIbOOY");

export default async (req,res) => {
    const {paymentInfo} =  req.body;
    const { authorization } = req.headers;
    if(!authorization)
    {
        return res.status(401).json({
        error:"you must be logged in----" 
        })
    }
    try
    {
        const user = JWT.verify(authorization,process.env.JWT_SECRET);
            const cart = await Cart.findOne({user:user.useId}).populate("products.product")
        let price=0;
        cart.products.forEach(item => {
            price= price + item.qty * item.product.price;
        })
        const prevcustomer = await stripe.customers.list({
            email:paymentInfo.email
        })
        let newcustomer;
        const isExitsingCustomer = prevcustomer.data.length > 0;
        if(!isExitsingCustomer)
        {
            newcustomer = await stripe.customers.create({
                email:paymentInfo.email,
                source:paymentInfo.id
            })
        }
        const charge = await stripe.charges.create({
            currency:"INR",
            amount:price * 100,
            receipt_email:paymentInfo.email,
            customer:isExitsingCustomer ? prevcustomer.data[0].id : newcustomer.id,
            description:`you purchase a product | ${paymentInfo.email}`,
        })
        await new Order({
            user:user.useId,
            email:paymentInfo.email,
            total:price,
            products:cart.products
        }).save()
        await Cart.findOneAndUpdate(
            {_id:cart._id},
            {$set:{products:[]}}
        )
        if(charge)
        {
            return res.status(200).json({
                message:"payment was successfuly"
            })
        }
        else
        {
            res.status(200).json({
                error:"payment failed"
            })
        }
    }
    catch(error)
    {
        return res.status(401).json({
            error:"Error processing payment"
        })
    }
}