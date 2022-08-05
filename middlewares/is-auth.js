const { newError } = require('../utils/errorsManage')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        newError('No login', 401)
    }
    const token = authHeader && authHeader.split(' ')[1]
    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedUser
    } catch (error) {
        newError('Invalid token', 401)
    }
    next()
}