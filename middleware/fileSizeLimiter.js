const MB = 3;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;


const fileSizeLimiter = (req, res, next) => {
    const files = req.files;
    const filesOverLimit = [];

    Object.keys(files).forEach(key => {
        const file = files[key]
        if(file.size > FILE_SIZE_LIMIT) {
            filesOverLimit.push(file.name)
        }
    })

    if(!!filesOverLimit.length) {
        return res.status(413).json({ status: "error", message: `上传失败. ${filesOverLimit.toString()} 超过文件限制 ${MB} MB `})
    }
    next()

}

module.exports = fileSizeLimiter