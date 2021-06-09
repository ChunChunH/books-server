const { response } = require('express')
const jwt = require('jsonwebtoken')

const validateJWT = (req, res = response, next) => {

    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "There is no token in the request"
        })
    }

    try {
        
        const {id, name, userType} = jwt.verify(token, process.env.SECRET_JWT_SEED)

        console.log(req.name)

        req.name = name
        req.id = id
        req.userType = userType

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Invalid token"
        })
    }

    next()
}

module.exports = {
    validateJWT
}