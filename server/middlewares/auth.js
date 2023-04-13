import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async(req,res,next) => {
    
    try {
        
        console.log("req.body = ", req.body);
        console.log("req.headers = ", req.headers);
        console.log("req.headers.authorization = ", req.headers.authorization);
        
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        console.log("isCustomAuth = ", isCustomAuth);
    
        let decodedData;
    
        if (token && isCustomAuth) {      
          decodedData = jwt.verify(token, secret);

          console.log("1. decodedData = ", decodedData);
    
          req.userId = decodedData?.id;

          console.log("1. req.userId = ", req.userId);
        } else {
          decodedData = jwt.decode(token);
            
          console.log("2. decodedData = ", decodedData);

          req.userId = decodedData?.sub;

          console.log("2.req.userId = ", req.userId);
        }    
    
        next();
      } catch (error) {
        console.log(error);
      }
}

export default auth;