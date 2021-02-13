import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const ordershcea = new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:"user"
    },
    products:[
    {
        qty:{type:Number,default:1},
        product:{type:ObjectId,ref:"product"}
    }
    ],
    email:{
        type:String,
        required:true,
    },
    total:{
        type:Number,
        required:true
    },
},{
    timestamps:true
})

const Order = mongoose.models.order || mongoose.model('order', ordershcea);

export default Order;