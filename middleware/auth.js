import jwt from "jsonwebtoken";
import usersModel from '../DB/models/user.model.js'



export const auth = () => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      var token = authorization.split(" ")[1];
      if (authorization.startsWith("Bearer")) {
        const decoded = jwt.verify(token, 'bs');
        // check if token is valid
        if (decoded) {
          // check user token if logged in
          const user = await usersModel.findOne({_id: decoded.id});
          console.log(user._id)
          if (user) {
            req.currentID = user._id;
            //console.log('from auth',req.currentID, user._id)
            next();
          } else {
            res.json({ message: "wrong token, user not exist" });
          }
        } else {
          res.json({ message: "token is not valid - try sign in" });
        }
      } else {
        res.json({ message: "invalid bearer " });
      }
    } catch (error) {
      res.json({ message: "error", error });
    }
  };
};
