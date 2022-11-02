const tagRouter = require("express")()
const query = require("../../util/mysql2")

//商品标签

tagRouter.get("/tags", async (req, res) => {  
  const { type } = req.query
  const sql = "select * from tag"
  query(sql, (result) => {
    if (!result.length) return res.send({ code: 404, msg: "查询失败" })
    if (type == "category") {
      const newRes = result.filter(item => item.parent == null)
      res.send({ code: 200, msg: "查询标签成功", data: newRes,total:newRes.length})
    } else {
      const datas = getData(result, null, [])
      res.send({ code: 200, msg: "查询标签成功", data: datas,total:datas.length })
    }
  })
})

//添加标签
tagRouter.post("/add/tag", async (req, res) => {   //shopdetail
  const { name } = req.body
    const sql = `insert into tag(name) values("${name}")`
    query(sql, (result) => {
      if (result.length==false) return res.send({ code: 404, msg: "添加标签失败" })
      res.send({ code: 200, msg: "添加标签成功" })
    })
})


//修改标签
tagRouter.post("/update/tag", async (req, res) => {   //shopdetail
  const { name,id } = req.body
    const sql = `update tag set name = "${name}" where detailId = "${id}"`
    query(sql, (result) => {
      if (result.length==false) return res.send({ code: 404, msg: "标签修改失败" })
      res.send({ code: 200, msg: "标签修改成功" })
    })
})


//删除标签
tagRouter.post("/delete/tag", async (req, res) => {   //shopdetail
  const {detailId } = req.body
    const sql = `delete from tag where id = "${id}"`
    query(sql, (result) => {
      if (result.length==false) return res.send({ code: 404, msg: "删除标签失败" })
      res.send({ code: 200, msg: "删除标签成功" })
    })
})




module.exports = tagRouter