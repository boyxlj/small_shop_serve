const payRouter = require("express")()
const query = require("../../util/mysql2")





 //查询PC端关于页面介绍
 payRouter.get("/sao/code", (req, res) => {
  res.send({ code: 200, data: null,msg: "扫码成功", tips:"想啥呢？还真打算支付呢？" });
});


module.exports = payRouter