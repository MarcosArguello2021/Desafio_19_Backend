import { Schema, model } from "mongoose"
const productosCollection = 'productos'

const productosSchema = Schema({
    name: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    }, 
    urlImage: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    id: {
        type: Number,
        required: true
    }, 
    stock: {
        type: Number,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})

export const Productos = model(productosCollection, productosSchema)