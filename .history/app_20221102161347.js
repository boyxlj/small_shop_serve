const express = require("express")
const cors = require("cors")
const JWT = require("./util/jst")
const { resolve } = require("path")
const app = express()
const noToken = require("./config/notoken")
app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// app.use((req,res,next)=>{
//   let path = req.url
//   if(path.indexOf("?")){
//     path = path.split("?")[0]
//   }
//   // if(path.includes("/static/images")){
//   //   console.log("找到")
//   //   path = "/static/images"
//   // }
//   if(path.includes("/static/images")){
//     next()
//     return
//   }else if(noToken.some(item=>path==item)){
//     next()
//     return
//   }
//   // if(noToken.some(item=>path==item)){

//   // }
//   const token = req.headers.authorization
//   if(token){
//     const payload = JWT.verifyToken(token)
//     if(payload){
//       // const {username,password} = payload
//       // JWT.setToken({username,password},"15s")
//       next()
//     }else{
//       res.status(401).send({
//         code:401,
//         msg:"token已失效"
//       })
//     }
//   }else{
//     res.status(401).send({
//       code:401,
//       msg:"token已失效"
//     })
//   }
// })


app.get("/", (req, res) => {
  res.send(`<h1>欢迎访问！http://localhost:3303</hr>`)
})

//前台
app.use("/api/user", require("./router/pre/user"))
app.use("/api/user", require("./router/pre/category"))
app.use("/api/user", require("./router/pre/collect"))
app.use("/api/user", require("./router/pre/order"))
app.use("/api", require("./router/pre/pay"))
app.use("/api/user", require("./router/pre/address"))

//后台
app.use("/api/back",require("./router/back/category"))
app.use("/api/back",require("./router/back/tagRouter"))
app.use("/api/back",require("./router/back/shop"))
app.use("/api/back",require("./router/back/manyUpload"))
app.use("/api/back", require("./router/back/user"))
app.use("/api/back", require("./router/back/order"))
app.use("/api/back", require("./router/back/admin"))
app.use("/api/back", require("./router/back/swiper"))


app.use(express.static(resolve(__dirname, "./public")))
app.use((req, res) => {
  res.status(404).send({
    code: 404, 
    msg: "路径有误"
  })
})
app.listen(3303, _ => console.log("服务器已启动! http://localhost:3303"))



