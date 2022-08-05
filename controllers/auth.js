const { validationResult } = require('express-validator/check')

const User = require('../models/user')
const { newError } = require('../utils/errorsManage')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.createUser = async (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        newError('Not validate body', 422, errors)
    }

    const email = req.body.email
    const name = req.body.name
    const password = req.body.password
    const passwordCrypt = await bcrypt.hash(password, 12)
    const user = new User({
        email,
        name,
        password: passwordCrypt
    })
    const result = await user.save()
    res.status(201).json({ message: 'User created', userId: result._id })
}

exports.login = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await User.findOne({ email })
        if (!user) {
            newError('No user available', 401)
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            newError('Invalid data', 401)
        }
        const token = jwt.sign({
            id: user._id.toString(),
            email
        }, process.env.JWT_SECRET, { expiresIn: '4h' })
        res.status(200).json({ token: token, userId: user._id.toString() })
    } catch {
        newError('Something goes wrong', 500)
    }
}