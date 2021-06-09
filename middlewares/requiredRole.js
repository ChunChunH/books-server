
const requiredRole = (requiredRole) => {
    return (req, res, next) => {
        console.log("REQ ISADMIN", req)
      if(req.userType === requiredRole) {
        return next();
      } else {
        return res.status(401).send('Action not allowed');
      }
    }
  }

module.exports = {
    requiredRole
}