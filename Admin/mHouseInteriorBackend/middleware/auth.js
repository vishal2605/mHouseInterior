const jwt=require('jsonwebtoken');

const authenticateJwt = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,process.env.SECRET,(err,user) =>{
            if(err){
                return sendStatus(403);
            }
            req.user=user;
            next();
        });
    }
    else{
        res.sendStatus(401);
    }
}

module.exports = {
    authenticateJwt,SECRET
}