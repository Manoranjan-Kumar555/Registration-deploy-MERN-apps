const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require("./Routes/AuthRouter");
const ProductsRouter = require("./Routes/ProductsRouter"); 
require("dotenv").config();
require("./Models/db");

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) =>{
    res.send("Welcome to the world")
})

app.get('/start', (req, res) =>{
    res.send("Manoranjana Kumar Kingdom!")
})

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/products", ProductsRouter);

app.listen(PORT, ()=>{
    console.log("Server listening on port Started on port " + PORT);
})