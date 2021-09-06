const Restaurant = require("../models/restaurant");

const create = (req, res) => {
    Restaurant.create(req.body).then(() => res.status(201).end())
        .catch((err) => (err.code === 11000) ? res.status(409).end() : res.status(400).end());
}

const read = (req,res) =>{
    Restaurant.findById(req.params.id)
    .then(result =>  result ? res.json(result) : res.status(404).end())
    .catch(err => {
        console.log(err);
        res.status(404).end()
    });
}

const readAll = async(req,res)=>{
    try{
        const restaurants = await Restaurant.find()
        res.json(restaurants);
    }catch(err){
        console.log(err);
        res.status(404).end()
    }
}

const update = async(req,res)=>{
    try{
         await Restaurant.findByIdAndUpdate({ _id: req.params.id }, req.body, { useFindAndModify: false });
         res.status(202).end();
    }catch(err){
        console.log(err);
        res.status(404).end()
    }
}

const remove = async(req,res)=>{
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(202).end();
}

module.exports = {create,read,readAll,update,remove}