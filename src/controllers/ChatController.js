const users = require("../models/UsersModel")

module.exports = class Chat {
    static async ChatGET(req, res) {
        let userList = await users.find()

        res.render("index", {
            users: userList,
            member: req.user,
        })
    }
}