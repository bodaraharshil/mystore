import initDB from '../../helpers/initDB';
import Product from '../../models/product'

initDB()

export default async(req,res) => {
  try
  {
    await Product.find().then((data) => {
      res.status(200).json({
        message:'get product data',
        data:data
      })
    }).catch((error) => {
      console.log("Error",error)
      res.status(400).json({
        error:"something went wrong", 
      })
    })
  }
  catch(error)
  {
    res.send({
      status:400,
      message:'something went wrong',
    })
  }
 }