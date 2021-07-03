import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      userName: user.userName,
      name: user.name,
      email: user.email, 

    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};



export const isAuth = async (req, res, next) => {

  const  authorization  = await req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify( token, process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          console.log('Invalid Token');
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
          // console.log(req.user);
        }
      }
    );
  } else {
    console.log('No Token');
    res.status(401).send({ message: 'No Token' });
  }
};



export const isSeller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Seller Token' });
  }
};
