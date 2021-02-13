import User from '../../models/user';
import Authenticated from '../../helpers/authenticated';

export default Authenticated(async(req,res)=> {
    const users = await User.find({_id:{$ne:req.user.useId}})
    res.status(200).json(users)
})