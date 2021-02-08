import initDB from '../../helpers/initDB';
import User from '../../models/user';
import Bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 

initDB();

export default async(req,res)=> {
    try{
        const {email,password} = req.body;
        if(!email || !password)
        {
            return res.status(422).json({
                message:"please add all filed"
            })
        }
        const userdata = await User.findOne({email});
        if(!userdata)
        {
            return res.status(401).json({
                error:'User dose not exit with that email'
            })
        }
        else
        {
            const domatch = await Bcrypt.compare(password,userdata.password);
            if(domatch)
            {
                const token = jwt.sign({useId:userdata._id},process.env.JWT_SECRET,{
                    expiresIn:"7d"
                })
                const {name,email,role} = userdata;
                return res.status(200).json({
                     token:token,
                     user:{name,role,email},
                     message:"you have to successfuly login"
                })
            }
            else
            {
                res.status(401).json({
                    error:"email and password do not match"
                })
            }
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
                    error:"something went wrong----"
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
