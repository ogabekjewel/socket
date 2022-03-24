const Express = require("express")
const HTTP = require("http")
const { Server } = require("socket.io")
const Path = require("path")
const Fs = require("fs")
const { PORT } = require("../config")
const CookieParser = require("cookie-parser")
const mongo = require("./modules/mongo")
const Morgan = require("morgan")

mongo()

const app = Express()
const server = HTTP.createServer(app)

// Serverni ishlashiga ta'sir qilmaydi, faqat socketlarni ulanib olishiga yordam beradi
const io = new Server(server)


// socket start --

io.on("connect", (socket) => {
    console.log(socket.id, "kirdi")

    socket.on("disconnect", (data) => {
        console.log(socket.id, "chiqdi")
    })
})

// socket end --


server.listen(PORT, _ => console.log(`SERVER READY AT PORT ${PORT}`))

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
app.use(CookieParser())
app.use(Morgan("tiny"))

// Socket ni frontendga ulash uchun
app.use("/socket", Express.static(Path.join(__dirname, "..", "node_modules", "socket.io", "client-dist")))

app.set("view engine", "ejs")
app.set("views", Path.join(__dirname, "views"))

Fs.readdir(Path.join(__dirname, "routes"), (err, files) => {
    if(!err) {
        files.forEach((file) => {
            let routePath = Path.join(__dirname, "routes", file)
            let Route = require(routePath)
            
            if(Route.path && Route.router) {
                app.use(Route.path, Route.router)
            }
        })
    }
})

