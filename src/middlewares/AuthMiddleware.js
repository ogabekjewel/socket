const { checkToken } = require("../modules/jwt")

module.exports = async function(req, res, next) {
    try {
        let token = req.cookies.token

        if(!token) {
            res.redirect("/users/login")
            return
        }

        data = await checkToken(token)

        if(!data) {
            res.redirect("/users/login")
            return
        }

        req.user = data
        next()
    } catch(e) {
        console.log(e)
    }
}