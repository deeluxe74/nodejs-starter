const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const isAuth = require('../middlewares/is-auth')

router.post('/create', authController.createUser)
router.post('/login', authController.login)

router.get('/is-auth', isAuth, (req, res) => {
    return res.status(200).json({ message: "Auth launch" })
})

module.exports = router