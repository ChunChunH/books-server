
const requiredRole = (requiredRole) => {
    return (req, res, next) => {
        console.log("REQ ISADMIN", req)
      if(req.userType === requiredRole) {
        return next();
      } else {
        return res.status(401).json({
          ok: false,
          msg: "Action not allowed"
        });
      }
    }
  }

module.exports = {
    requiredRole
}