const { v4 } = require("uuid")
const users = require("../models/UsersModel")
const { compareHash, generateHash } = require("../modules/bcrypt")
const { generateToken } = require("../modules/jwt")

module.exports = class UsersController {
    static async SignUpGET(req, res) {
        res.render("signup", {
            title: "Sign Up",
        })
    }

    static async LoginGET(req, res) {
        res.render("login", {
            title: "Login",
        })
    }

    static async loginPOST(req, res) {
        try {
            let { login, password } = req.body

            let user = await users.findOne({
                login,
            })
    
            if(!user) throw new Error("User topilmadi")
    
            let isPasswordTrue = await compareHash(password, user.password)
    
            if(!isPasswordTrue) throw new Error("Parol noto'g'ri")
    
            let token = await generateToken({
                login,
            })
    
            res.cookie("token", token).redirect("/")            
        } catch(e) {
            res.render("login", {
                error: e +"",
            })
        }
    }

    static async SignUpPOST(req, res) {
        try {
            let { login, password } = req.body

            let user = await users.findOne({
                login,
            })
    
            if(user) throw new Error("Siz oldin ro'yxatdan o'tgansiz")
    
            let pass = await generateHash(password)

            await users.create({
                id: v4(),
                login,
                password: pass,
            })
    
            let token = await generateToken({
                login,
            })
    
            res.cookie("token", token).redirect("/")            
        } catch(e) {
            res.render("signup", {
                error: e +"",
            })
        }
    }
}