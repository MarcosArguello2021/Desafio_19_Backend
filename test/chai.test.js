import { assert } from 'chai';
import {
  getProductos,
  postProduct,
  updateProduct,
  deleteProduct
} from './axios.request.js'

let idModificar = '63c7120e5c4ff387bd18dacf'; 
let idBorrar = '63c7fb7f8eef97a862af6e7c'

describe('Prueba Chai', function () {

    it('CONSULTAR TODOS LOS PRODUCTOS - contiene status 200 y un array', async function () {
      const { status, data } = await getProductos()
      assert.equal(status, 200)
      assert.typeOf(data, 'array')
    })

    it('GUARDAR PRODUCTO - contiene status 200 y y un array con un mensaje de exito', async function () {
      const { status, data } = await postProduct()
      assert.equal(status, 200)
      assert.typeOf(data, 'object')
      assert.equal(JSON.stringify(data), JSON.stringify({ messaje: 'producto guardado con exito' }))
    })

    it('ACTUALIZAR PRODUCTO - contiene status 200 y y un array con un mensaje de exito', async function () {
      const { status, data } = await updateProduct(idModificar)
      assert.equal(status, 200)
      assert.typeOf(data, 'object')
      assert.equal(JSON.stringify(data), JSON.stringify({ messaje: 'producto actualizado con exito' }))
    })

    it('BORRAR PRODUCTO - contiene status 200 y y un array con un mensaje de exito', async function () {
      const { status, data } = await deleteProduct(idBorrar)
      assert.equal(status, 200)
      assert.typeOf(data, 'object')
      assert.equal(JSON.stringify(data), JSON.stringify({ messaje: 'producto borrado con exito' }))
    })
  
})