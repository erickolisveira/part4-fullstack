const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/User')

userRouter.get('/', async (req, res, next) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    res.json(users.map(user => user.toJSON()))
})

userRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body
        const saltHounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltHounds)

        if (!body.username || !body.password) {
            return res
              .status(401)
              .json({ error: "username or password missing" })
              .end()
        }

        if (body.username.length < 3 || body.password.length < 3) {
            return res
                .status(401)
                .json({ error: 'username and password should be at least three characters long' })
                .end()
        }

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })

        const savedUser = await user.save()

        res.json(savedUser).end()
    } catch (e) {
        next(e)
    }
})

module.exports = userRouter
