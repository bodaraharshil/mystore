import initDB from '../../helpers/initDB';
import Order from '../../models/order';
import Authenticated from '../../helpers/authenticated'

initDB();

export default Authenticated(async(req,res) => {
    const Orders = await Order.find({user:req.user.useId}).populate("products.product")
    res.status(200).json({Orders})

})