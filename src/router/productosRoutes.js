import { Router } from "express";
const routerProductos = Router();
import { auth } from '../controllers/userController.js'
import { 
    obtenerProductoId, 
    guardarProducto, 
    actualizarProductoId, 
    borrarProductoID 
} from '../controllers/productosController.js'

routerProductos.get('/productos/:id?', obtenerProductoId)

routerProductos.post('/productos/', guardarProducto)

routerProductos.put('/productos/:id', actualizarProductoId)

routerProductos.delete('/productos/:id', borrarProductoID)

export default routerProductos;