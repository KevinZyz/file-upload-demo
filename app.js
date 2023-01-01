const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileUpload')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3500;

const filesPayloadExists = require('./middleware/filesPayloadExists')
const fileSizeLimiter = require('./middleware/fileSizeLimiter')
const fileExtLimiter = require('./middleware/fileExtLimiter')

app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post("/upload",
    fileUpload({ createParentPath: true }), 
    filesPayloadExists, 
    fileExtLimiter(["jpg", "png", "jpeg"]), 
    fileSizeLimiter, 
    (req, res) => {
    const files = req.files
    Object.keys(files).forEach(key => {
        const file = files[key]
        file.mv(path.join(__dirname, "files", file.name))
    })
    res.json({ status: 'success', message: '上传成功' })
})

app.listen(PORT, () => console.log('server running on port ', PORT))