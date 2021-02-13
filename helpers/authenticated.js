import JWT from 'jsonwebtoken';


export default function Authenticated(icomponent){
    return async(req,res) => {
        const { authorization } = req.headers;
        if(!authorization)
        {
            return res.status(401).json({
            error:"you must be logged in----" 
            })
        }
            try
            {
                const user = JWT.verify(authorization,process.env.JWT_SECRET);
                req.user =user
                return icomponent(req,res)
            }
            catch(error)
            {
                return res.status(401).json({
                    error:"you must be logged In"
                })
            }
    }
} 