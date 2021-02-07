import initDB from '../../helpers/initDB';
import Product from '../../models/product'

initDB()

export default async(req,res) => {

  switch(req.method)
  {
    case "GET":
      await getAllProduct(req,res);
      break;
    case "POST":
      await saveProduct(req,res);
      break;
  }
 }

 const getAllProduct = async(req,res) => {
  try
  {
    await Product.find().then((data) => {
      res.status(200).json({
        message:'get product data',
        data:data
      })
    }).catch((error) => {
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

 const saveProduct = async(req,res) => {
  try
  {
    const {name,price,description,mediaurl} = req.body;
    if(!name || !price || !description || !mediaurl)
    {
      return res.status(422).json({
        error:"please add all the fields"
      })
    }
    const productdata = await new Product({
      name,
      price,
      description,
      mediaurl      
    });
    productdata.save().then((data) => {
      res.status(200).json({
        message:'product add successfuly'
      })
    }).catch((eror) => {
      res.status(400).json({
        error:"something went wrong--1"
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