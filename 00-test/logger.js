logger = (function (req,res,next)  {
    const url = req.url
    const method = req.method
    const time = new Date().getFullYear()
    console.log(time, method, url)
    next()
})

module.exports = logger