require('dotenv').config();
require('./initDB');
const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require("./routes/user")
const restaurantRoutes = require("./routes/restaurant")
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.listen(PORT,()=>{
    console.log(`server listen on port ${PORT}`)
})
app.use("/user",userRoutes);
app.use("/restaurant",restaurantRoutes)