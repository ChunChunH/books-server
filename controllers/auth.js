const {response} = require('express');
const User = require('../models/User')
const bcrypt = require("bcryptjs");
const { generateJWT } = require('../helpers/jwt');

const register = async(req, res = response) => {
    
    const {name, email, password} = req.body

    try {
        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({
                ok: false,
                msg: "A user with that email already exists",
            })
        }

        user = new User({name, email, password, userType: "user"})
         
        //Encriptar contra
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        //Generar JWT
        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            msg: "Successfully registered user!",
            user: {
                id: user.id,
                password: user.password,
                name: user.name,
                email: user.email,
                userType: user.userType,
                token
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "An error has occurred, please talk to the administrator",
        })
    }
}


const login = async(req, res = response) => {

    const {email, password} = req.body

    try {

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: "There is no user registered with that email",
            })
        }

        //Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, user.password )

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: "Password is incorrect",
            })
        }

        //Generar JWT
        const token = await generateJWT(user.id, user.name)

        res.status(200).json({
            ok: true,
            msg: "User logged in successfully!",
            user: {
                id: user.id,
                name: user.name,
                userType: user.userType,
                token
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "An error has occurred, please talk to the administrator",
        })
    }

}


const tokenRevalidate = async(req, res = response) => {

    const {id, name} = req

    const token = await generateJWT(id, name)

    res.status(200).json({
        ok: true,
        msg: "Token revalidated",
        token
    })
}

module.exports = {
    register,
    login,
    tokenRevalidate
}