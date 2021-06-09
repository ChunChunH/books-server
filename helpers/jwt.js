const jwt = require('jsonwebtoken')

const generateJWT = (id, name, userType) => {

    return new Promise((resolve, reject) => {

        console.log("NAME IN GENERATEJWT", name)
        const payload = {id, name, userType}

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: "2h",
        }, (err, token) => {
          
            if (err){
                console.log(err)
                reject("The token could not be generated")
            }

            resolve(token)
            
        })

    })

}

module.exports = {
    generateJWT
}