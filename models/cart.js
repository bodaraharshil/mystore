import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const cartshcea = new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:"user"
    },
    products:[
    {
        qty:{type:Number,default:1},
        product:{type:ObjectId,ref:"product"}
    }
    ]
})

const Cart = mongoose.models.cart || mongoose.model('cart', cartshcea);

export default Cart;