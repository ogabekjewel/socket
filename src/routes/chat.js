const users = require("../models/UsersModel")

const router = require("express").Router()

router.get("/", async (req, res) => {
    let userList = await users.find()
    res.render("index", {
        users: userList,
    })
})

module.exports = {
    path: "/",
    router,
}