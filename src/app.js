const Express = require("express")
const HTTP = require("http")
const { Server } = require("socket.io")
const Path = require("path")
const Fs = require("fs")
const { PORT } = require("../config")
const CookieParser = require("cookie-parser")
const mongo = require("./modules/mongo")

mongo()

const app = Express()
const server = HTTP.createServer(app)

// Serverni ishlashiga ta'sir qilmaydi, faqat socketlarni ulanib olishiga yordam beradi
const io = new Server(server)

server.listen(PORT, _ => console.log(`SERVER READY AT PORT ${PORT}`))

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
app.use(CookieParser())

// Socket ni frontendga ulash uchun
app.use("/socket", Express.static(Path.join(__dirname, "..", "node_modules", "client-dist")))

app.set("view engine", "ejs")
app.set("views", Path.join(__dirname, "views"))

Fs.readdir(Path.join(__dirname, "routes"), (err, files) => {
    if(!err) {
        files.forEach(file => {
            let routePath = Path.join(__dirname, "routes", file)
            let Route = require(routePath)
            
            if(Route.path && routePath.router) {
                app.use(Route.path && routePath.router)
            }
        })
    }
})

