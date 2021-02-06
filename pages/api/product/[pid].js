import Product from '../../../models/product';

export default async(req,res) => {
    const { pid } = req.query;
    console.log("req......",req.query);
    const product = await Product.findOne({_id:pid})
        .then((data) => {
            res.status(200).json({
                message:"get a product detail page",
                data:data 
            })
        }).catch((error) => {
            console.log("Error",error);
            res.status(401).json({
                error:"something went wrong"
            })
        })
}