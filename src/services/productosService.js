
import mongoose from 'mongoose'
import config from '../utils/config.js'
import {Productos} from "../persistence/models/ProductoModel.js"
import { auth } from '../controllers/userController.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

export const getProductById = async(req, res) =>{  // Esta funcion devuelve un producto segun su ID o devuelve todos
    const { id } = req.params
    try {
        if (!id) {
            const productos = await Productos.find()
            res.status(200).send(productos)
        } else {
            const product = await Productos.find({ id: id })
            if (product.length==0) {
                res.status(400).json({ error: 'producto no encontrado' })
            } else {
                res.status(200).send(product)
            }
        }

    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }
}

export const saveProduct = async(req, res) =>{      // Guarda un prodcuto nuevo
    if (auth) {
        const { name, price, urlImage, description, id, stock } = req.body

        if (!name || !price || !urlImage || !description || !id || !stock) {
            res.status(400).json({ error: 'por favor ingrese todos los datos del producto' })
        } else {

            const product = req.body
            try {
                await Productos.insertMany(product)
                res.status(200).json({ messaje: 'producto guardado con exito' })
            } catch (error) {
                res.status(400).json({ error: `${error}` })
            }
        }
    } else {
        res.status(400).json({ messaje: 'usted no tiene permisos para consultar esta url' })
    }
}

export const updateProductByID = async(req, res) =>{  // Recibe y actualiza un producto según su id.
    if (auth) {
        const { idParam } = req.params                                                                   // Tomamos el ID
        const { name, price, urlImage, description, id, stock } = req.body                        // Tomamos el cuerpo

        if (!name || !price || !urlImage || !description || !id || !stock) {                    // Comprobamos que el cuerpo este completo
            res.status(400).json({ error: 'por favor ingrese todos los datos del producto' })
        } else {
            try {
                const product = await Productos.findById(idParam)
                if (product) {
                    product[0].name = name
                    product[0].price = price
                    product[0].urlImage = urlImage
                    product[0].description = description
                    product[0].id = id
                    product[0].stock = stock
                    await Productos.save(product[0])
                    res.status(200).json({ messaje: 'producto actualizado con exito' })
                } else {
                    res.status(400).json({ error: 'producto no encontrado' })
                }
            } catch (error) {
                res.status(400).json({ error: `${error}` })
            }
        }
    } else {
        res.status(400).json({ messaje: 'usted no tiene permisos para consultar esta url' })
    }
}

export const  deleteProductById = async(req, res) =>{  // Esta funcion elimina un producto segun su ID
    if (auth) {
        const { id } = req.params
        try {
            await Productos.deleteOne({ id: id })
            res.status(200).json({ messaje: 'producto borrado con exito' })
        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }
    } else {
        res.status(400).json({ messaje: 'usted no tiene permisos para consultar esta url' })
    }
}