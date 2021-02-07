import initDB from '../../helpers/initDB';
import User from '../../models/user';
import Bcrypt from 'bcryptjs';

initDB();

export default async(req,res)=> {
    const {name,email,password} = req.body;
    try{
        if(!name || !email || !password)
        {
            return res.status(422).json({
                message:"please add all filed"
            })
        }
        const userdata = await User.findOne({email});
        if(userdata)
        {
            return res.status(401).json({
                error:'email is already used'
            })
        }
        else
        {
            const hashpassword = await Bcrypt.hash(password,12)
            const user = new User({
                name,
                email,
                password:hashpassword
            });
            user.save().then((data) => {
                return res.status(200).json({
                    message:"you have successfuly registred"
                })
            }).catch((error) => {
                return res.status(400).json({
                    error:"something went wrong"
                })
            })
        }
    }
    catch(error)
    {
        return res.status(400).json({
            error:"something went wrong"
        })
    }
}
