const jwt=require('jsonwebtoken');

const isAuth = (req,res,next) => {
   // console.log("req data=> ",req);

    const Token=req.headers['authorization'];
    
    //Token based auth
    if(Token) {
        const decoded=jwt.verify(Token,process.env.SECRET_KEY);
        req.user=decoded; 
       // console.log("decoded => ",decoded);
        next();
    }
    else if(req.session.isAuth) {
        next();
    }
    else
    {
        return res.send({
            status:401,
            message:"Session Expired or Unauthorized , Please login again",
        });
    }

   /*
   //for Session based auth
    if(req.session.isAuth) {
        next();
    }
    else
    {
        return res.send({
            status:401,
            message:"Session Expired , Please login again",
        });
    }*/

}

module.exports = isAuth;