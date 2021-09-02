import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    let decodedToken;
    const isGoogleLogin = accessToken.length > 500;

    if (accessToken && !isGoogleLogin) {
      decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.creatorId = decodedToken?.id;
    } else {
      decodedToken = jwt.decode(accessToken);
      req.creatorId = decodedToken?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
