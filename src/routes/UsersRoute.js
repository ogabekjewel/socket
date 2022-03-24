const router = require("express").Router()
let { LoginGET, SignUpGET, loginPOST, SignUpPOST } = require("../controllers/UsersController")

router.get("/login", LoginGET)
router.get("/signup", SignUpGET)
router.post("/login", loginPOST)
router.post("/signup", SignUpPOST)

module.exports = {
    path: "/users",
    router
}