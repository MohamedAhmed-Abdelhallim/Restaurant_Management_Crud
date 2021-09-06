const User = require("../models/user");
const jwt = require("auth-jwt");

const create = (req, res) => {
    User.create(req.body).then(() => res.status(202).end())
        .catch((err) => (err.code === 11000) ? res.status(409).end() : res.status(400).end());
}

const login = async (req, res) => {
    try {
        // Verify username from Database
        const userInstance = await User.findOne({ username: req.body.username })

        //Username Found
        if (userInstance) {
            if (await userInstance.isValidPassword(req.body.password)) {
                const userId = { userId: userInstance.id };
                const accessToken = jwt.generateAccessToken(userId);
                return res.json({ accessToken });
            } else {
                return res.status(401).end();
            }
        } else {
            return res.status(401).end();
        }
    } catch (err) {
        console.log(err)
        return res.status(401).end();
    }
}

module.exports = {create,login}