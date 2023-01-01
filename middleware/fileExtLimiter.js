const path = require('path');

const fileExtLimiter = (allowedExtArray) => {
    return (req, res, next) => {
        const files = req.files
        
        const fileExtensionsNotMatchArray = []
        Object.keys(files).forEach(key => {
            const file = files[key]
            const ext = path.extname(file.name).slice(1)
            console.log('ext', ext)
            if(!allowedExtArray.includes(ext)) {
                fileExtensionsNotMatchArray.push(file.name)
            }
        })

        if(!!fileExtensionsNotMatchArray.length) {
            return res.status(422).json({ status: "error", message: `上传失败，仅支持上传 ${allowedExtArray.toString()} 格式的文件`})
        }
        next()
    }
}

module.exports = fileExtLimiter