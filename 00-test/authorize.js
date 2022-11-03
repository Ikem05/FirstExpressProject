
const authorize = (req,res,next) => {
    const auth = req.query.name
    console.log(auth)
    if (auth !== '') {
        return res
        .send(`${auth} is authenticated`)
        
    } else {
        res.send('request is unauthorized')
    }
    next()
    
}

module.exports = authorize