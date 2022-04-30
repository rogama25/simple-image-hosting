const express = require("express")
const fileupload = require("express-fileupload")
const jimp = require("jimp")
const fs = require("fs")
const path = require("path")
const uuid = require("uuid")

const app = express()
app.use(fileupload())

app.post("/upload", (req, res) =>{
    Object.values(req.files).forEach(v => {
        if (!["image/jpeg", "image/png", "image/bmp", "image/tiff", "image/gif"].includes(v.mimetype)){
            res.status(400).send("Que no, mijo")
            return
        }
        while (true){
            var id = uuid.v4()
            if (!fs.existsSync(path.resolve(__dirname, `./upload/${id}.jpg`))){
                break
            }
        }
        jimp.read(v.data).then(i => {
            i.writeAsync(path.resolve(__dirname, `./upload/${id}.jpg`)).then(a => {
                res.send({route: `http://localhost:8080/${id}.jpg`})
            })
        })
    })
})

app.use(express.static("upload"))

app.listen(8080, () => {
    console.log("Server started")
})