import { Router } from "express";
const routerProductos = Router();
import { auth } from '../controllers/userController.js'
import { 
    obtenerProductoId, 
    guardarProducto, 
    actualizarProductoId, 
    borrarProductoID 
} from '../controllers/productosController.js'

// El router base '/api/productos' implementará cuatro funcionalidades:

//1. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto  por su id (disponible para usuarios y administradores)
routerProductos.get('/productos/:id?', obtenerProductoId)

//2. POST: '/' - Para incorporar productos al listado (disponible para administradores)
routerProductos.post('/productos/', guardarProducto)

//3. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
routerProductos.put('/productos/:id', actualizarProductoId)

//4. DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
routerProductos.delete('/productos/:id', borrarProductoID)

export default routerProductos;