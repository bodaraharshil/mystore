

import initDB from '../../helpers/initDB';
import JWT from 'jsonwebtoken';
import Cart from '../../models/cart';

initDB();

export default async(req,res) => {
    switch(req.method){
        case "GET":
            await fetchUsercart(req,res)
            break;
        case "PUT":
            await Addtocart(req,res);
            break;
        case "DELETE":
            await Removeproduct(req,res)
            break;
    }
}

function Authenticated(icomponent){
    return async(req,res) => {
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
                req.user =user
                return icomponent(req,res)
            }
            catch(error)
            {
                return res.status(401).json({
                    error:"you must be logged In"
                })
            }
    }
} 

const fetchUsercart = Authenticated(async(req,res) => {
    const cart = await Cart.findOne({user:req.user.useId}).populate("products.product")
    res.status(200).json(cart.products)
})

const Addtocart = Authenticated(async(req,res) => {
    const {qty,productId} = req.body;
    const cart = await Cart.findOne({user:req.user.useId});
    const pExstis = cart.products.some(pdoc =>productId === pdoc.product.toString())
    if(pExstis)
    {
        await Cart.findOneAndUpdate(
                {_id:cart.id,"products.product":productId},
                {$inc:{"products.$.qty":qty}}
            )
    }
    else
    {
        const newproduct = {qty,product:productId}
        await Cart.findOneAndUpdate({_id:cart._id},{$push:{products:newproduct}})
    }
    res.status(200).json({
        message:"product addedd successfuly"
    })
})

const Removeproduct =Authenticated(async(req,res) => {
    console.log("{}{}{}",req.body)
    const {productId} = req.body
    const cart = await Cart.findOneAndUpdate(
        {user:req.user.useId},
        {$pull:{products:{product:productId}}},
        {new:true}
    ).populate("products.product")
    res.status(200).json(cart.products)
})
