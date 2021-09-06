const User = require("../models/user");

const create = (req, res) => {
    User.create(req.body).then(() => res.status(202).end())
        .catch((err) => (err.code === 11000) ? res.status(409).end() : res.status(400).end());
}

module.exports = {create}