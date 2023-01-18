import {getProductById, saveProduct, updateProductByID, deleteProductById} from '../services/productosService.js';

export const obtenerProductoId = async (req, res) => {  // Esta funcion devuelve un producto segun su ID
    try {
       await getProductById(req, res)    
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }  
}

export const guardarProducto = async (req, res) => {        // Guarda un prodcuto nuevo
    try {
        await saveProduct(req, res)
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }
}

export const actualizarProductoId = async (req, res) => {  // Recibe y actualiza un producto según su id.
    try {
        await updateProductByID(req, res)
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }
}


export const borrarProductoID = async (req, res) => {   // Esta funcion elimina un producto segun su ID
    try {
        await deleteProductById(req, res)
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }
}
