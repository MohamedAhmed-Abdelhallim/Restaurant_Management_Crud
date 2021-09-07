const Restaurant = require("../models/restaurant");

const create = (req, res) => {
    Restaurant.create(req.body).then(() => res.status(201).end())
        .catch((err) => {
            console.log(err)
                (err.code === 11000) ? res.status(409).end() : res.status(400).end()
        });
}

const read = (req, res) => {
    Restaurant.findById(req.params.id)
        .then(result => result ? res.json(result) : res.status(404).end())
        .catch(err => {
            console.log(err);
            res.status(404).end()
        });
}

const readAll = async (req, res) => {
    try {
        const ownedBy = req.query.id === 'undefined' ? {} : { ownedBy: req.query.id };
        const restaurants = await Restaurant.find(ownedBy)
        res.json(restaurants);
    } catch (err) {
        console.log(err);
        res.status(404).end()
    }
}

const update = async (req, res) => {
    try {
        console.log("here")
        const restaurant = await Restaurant.findById(req.params.id).populate({ path: "ownedBy", select: '_id' });
        console.log(typeof JSON.stringify(restaurant.ownedBy));
        let str = restaurant.ownedBy;
        str = str.toString().slice(21, 45)
        if (str === req.query.id) {
            await Restaurant.findByIdAndUpdate({ _id: req.params.id }, req.body, { useFindAndModify: false });
            res.status(202).end();
        }
    } catch (err) {
        console.log(err);
        res.status(404).end()
    }
}

const remove = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id).populate({ path: "ownedBy", select: '_id' });
    console.log(typeof JSON.stringify(restaurant.ownedBy));
    let str = restaurant.ownedBy;
    str = str.toString().slice(21, 45)
    if (str === req.query.id) {
        console.log("here")
        await Restaurant.findByIdAndDelete(req.params.id);
        res.status(202).end();
    } else {
        res.status(401).end();
    }
}

module.exports = { create, read, readAll, update, remove }