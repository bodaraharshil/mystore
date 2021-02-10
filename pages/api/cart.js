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
            await addProduct(req,res);
            break;
    }
}

async function Authenticated(icomponent){
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
            const user = await JWT.verify(authorization,process.env.JWT_SECRET);
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

const fetchUsercart =Authenticated(async(req,res) => {
    console.log("000000000000",user)
    const cart = await Cart.findOne({user:user.useId});
    res.status(200).json(cart.products)
})
