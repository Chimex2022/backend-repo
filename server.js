const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Product = require('./Models/productModels.js')


//middlewares

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())

// routes for web server
app.get('/', (req, res)=> {
    res.send("Hello page")
})

app.get('/blog', (req, res)=> {
    res.send("My blog page, My Great Blog")
})


//fetch data
app.get('/product', async (req, res)=> {
  try {
    const product = await Product.find({})
  } catch (error) {
    console.log(error.message);
    res.send(500).json({message: error.message})
  }
})

//fetch data by id
app.get('product/:id', async (req, res)=> {
    try {
        const {id} = req.params.id
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
        
    }
})

//update by id
app.put('product/:id', async (req, res)=> {

    try {
        const {id} = req.params.id
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product) {
            return res.status(404).json({message: `cannot find any id ${id}`})
        }
            
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})


//post or add new data
app.post('/product', async (req, res)=> {
  try {
   const product = await Product.create(req.body) 
   res.status(200).json(product)
   
   
  }

  catch(error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})

//how to connect to mongo Db
mongoose.connect('mongodb+srv://kirchoff200:6565@cluster0.qgtpoon.mongodb.net/new?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000, ()=> {
        console.log(`Node Api is running on port 3000`);
    })
   console.log('connected');
}).catch((error) => {
    console.log(error);
})