import mongoose,{ models } from 'mongoose';

const Productshcema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    mediaurl:{
        type:String,
        required:true
    },
})

const product = mongoose.models.product || mongoose.model('product', Productshcema);

export default product;