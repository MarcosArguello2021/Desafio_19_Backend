
import mongoose from 'mongoose'
import config from '../utils/config.js'
import {Productos} from "../persistence/models/ProductoModel.js"
import { auth } from '../controllers/userController.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

export const getProductById = async(req, res) =>{  
    const { id } = req.params

    try {
        if (!id) {
            const productos = await Productos.find()
            res.json(productos)
        } else {
            const product = await Productos.find({ _id: id })
            if (product.length==0) {
                res.json({ error: 'producto no encontrado' })
            } else {
                res.json(product)
            }
        }

    } catch (error) {
        res.json({ error: `${error}` })
    }
}

export const saveProduct = async(req, res) =>{      
    // if (auth) {
        const { name, price, urlImage, description, code, stock } = req.body

        if (!name || !price || !urlImage || !description || !code || !stock) {
            res.json({ error: 'por favor ingrese todos los datos del producto' })
        } else {

            const product = req.body
            try {
                await Productos.insertMany(product)
                res.json({ messaje: 'producto guardado con exito' })
            } catch (error) {
                res.json({ error: `${error}` })
            }
        }
    // } else {
    //     res.status(400).json({ messaje: 'usted no tiene permisos para consultar esta url' })
    // }
}

export const updateProductByID = async(req, res) =>{ 
    // if (auth) {
        const { id } = req.params                                                              
        const { name, price, urlImage, description, code, stock } = req.body  

        if (!name || !price || !urlImage || !description || !code || !stock) {                    
            res.json({ error: 'por favor ingrese todos los datos del producto' })
        } else {
            try {
                const product = await Productos.findOne({ "_id": id })
                if (product) {
                    product.name = name
                    product.price = price
                    product.urlImage = urlImage
                    product.description = description
                    product.code = code
                    product.stock = stock
                    await Productos.replaceOne({ "_id": id }, product)
                    res.json({ messaje: 'producto actualizado con exito' })
                } else {
                    res.json({ error: 'producto no encontrado' })
                }
            } catch (error) {
                res.json({ error: `${error}` })
            }
        }
    // } else {
    //     res.status(400).json({ messaje: 'usted no tiene permisos para consultar esta url' })
    // }
}

export const  deleteProductById = async(req, res) =>{  
    const { id } = req.params 
    // if (auth) {
        try {
            await Productos.deleteOne({ _id: id })
            res.json({ messaje: 'producto borrado con exito' })
        } catch (error) {
            res.json({ error: `${error}` })
        }
    // } else {
    //     res.status(400).json({ messaje: 'usted no tiene permisos para consultar esta url' })
    // }
}