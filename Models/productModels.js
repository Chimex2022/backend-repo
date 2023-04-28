const mongoose = require('mongoose')

const productSchema = mongoose.Schema({

        name: {
            type: String,
            required: [true, "Please add a name"]
        },

        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
            
        },

        password: {
           type: String,
           required: [true, "Please enter a password"]
        },

    })


    const Product = mongoose.model("Product", productSchema)
    module.exports = Product