const { ChatGET } = require("../controllers/ChatController")
const AuthMiddleware = require("../middlewares/AuthMiddleware")
const users = require("../models/UsersModel")

const router = require("express").Router()

router.get("/", AuthMiddleware, ChatGET)
router.get("/:login", AuthMiddleware, ChatGET)

module.exports = {
    path: "/",
    router,
}