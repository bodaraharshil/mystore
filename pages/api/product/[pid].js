import Product from '../../../models/product';
import initDB from '../../../helpers/initDB';

initDB();

export default async(req,res) => {
    switch(req.method)
    {
        case "GET":
            await getProduct(req,res);
            break;
        case "DELETE":
            await deleteProduct(req,res);
            break;
    }
}

const getProduct = async(req,res) => {
    const { pid } = req.query;
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

const deleteProduct = async(req,res) => {
    const { pid } = req.query;
    const product = await Product.findByIdAndDelete({_id:pid})
    .then((data) => {
        res.status(200).json({
            message:"product delete",
        })
    }).catch((error) => {
        console.log("Error",error);
        res.status(401).json({
            error:"something went wrong"
        })
    })
}