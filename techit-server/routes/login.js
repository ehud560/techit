const express = require("express")
const joi = require("joi")
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const router = express.Router()

const loginSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(8),
});

router.post("/", async (req, res) => {
    try {
        // 1. joi validation
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        // 2. check if user exist
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).send("Wrong email or password");

        // 3. check the password - compare
        const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) return res.status(400).send("Wrong email or password");

        // 4. create token & return a respone with token
        const token = jwt.sign(
            { _id: user._id, isAdmin: user.isAdmin, email: user.email },
            process.env.jwtKey
        );

        res.status(200).send(token);
    } catch (error) {
        res.status(400).send.apply(error)
    }
});

module.exports = router;