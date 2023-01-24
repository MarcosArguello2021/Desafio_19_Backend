import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import mongoose from 'mongoose'
import config from '../utils/config.js'
import { Productos } from "../persistence/models/ProductoModel.js"
await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

const schema = buildSchema(`
  input ProductosInput {
    name: String,
    price: Int,
    urlImage: String,
    description: String,
    code: Int,
    stock: Int
  }
  type Producto {
    _id: String,
    name: String
    price: Int
    urlImage: String
    description: String
    code: Int
    stock: Int
  }
  type Response {
    response: String
  }
  type Query {
    getProductos: [Producto]
  }
  type Mutation {
    guardarProducto(datos: ProductosInput): Producto
    actualizarProductoId(datos: ProductosInput): Response,
    borrarProductoID(id: String): Response,
  }
`)

const getProductos = async () => {
  try {
    const productos = await Productos.find()
    console.log(productos)
    return productos;
  } catch (error) {
    console.log({ error: `${error}` })
  }
}

const guardarProducto = async (datos) => {
  try {
    const producto = await Productos.insertMany(datos);
    console.log(producto)
    return producto
  } catch (error) {
    return { error: 'producto no guardado' }
  }
}

const actualizarProductoId = async (datos) => {
  const { id } = datos._id;
  if (!datos.name || !datos.price || !datos.urlImage || !datos.description || !datos.code || !datos.stock) {
    return { error: 'por favor ingrese todos los datos del producto' }
  } else {
    try {
      const product = await Productos.findOne({ "_id": id })
      if (product) {
        product.name = datos.name
        product.price = datos.price
        product.urlImage = datos.urlImage
        product.description = datos.description
        product.code = datos.code
        product.stock = datos.stock
        await Productos.replaceOne({ "_id": id }, product)
        return producto
      } else {
        return { error: 'producto no encontrado' }
      }
    } catch (error) {
      console.error(`El error es: ${error}`)
    }
  }
}

const borrarProductoID = async (id) => {
  // if (auth) {
  try {
    const prod = Productos.findOne({ _id: id })
    await Productos.deleteOne({ _id: id })
    return prod
  } catch (error) {
    return { error: 'producto no encontrado' }
  }
}

export const graphqlProductController = graphqlHTTP({
  schema: schema,
  rootValue: {
    getProductos: getProductos,
    guardarProducto: guardarProducto,
    actualizarProductoId: actualizarProductoId,
    borrarProductoID: borrarProductoID
  },
  graphiql: true,
})


