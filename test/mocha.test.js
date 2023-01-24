import { strict as assert } from "assert";
import {
  getProductos,
  postProduct,
  updateProduct,
  deleteProduct
} from './axios.request.js'

let idModificar = '63c7120e5c4ff387bd18dacf'; 
let idBorrar = '63c7fc70986d90041abf1e1e'

describe('Prueba Mocha', function () {

    it('CONSULTAR TODOS LOS PRODUCTOS - contiene status 200 y un array', async function () {
      const { status, data } = await getProductos()
      assert.strictEqual(status, 200)
    })

    it('GUARDAR PRODUCTO - contiene status 200 y y un array con un mensaje de exito', async function () {
      const { status, data } = await postProduct()
      assert.strictEqual(status, 200)
      assert.strictEqual(JSON.stringify(data), JSON.stringify({ messaje: 'producto guardado con exito' }))
    })

    it('ACTUALIZAR PRODUCTO - contiene status 200 y y un array con un mensaje de exito', async function () {
      const { status, data } = await updateProduct(idModificar)
      assert.strictEqual(status, 200)
      assert.strictEqual(JSON.stringify(data), JSON.stringify({ messaje: 'producto actualizado con exito' }))
    })

    it('BORRAR PRODUCTO - contiene status 200 y y un array con un mensaje de exito', async function () {
      const { status, data } = await deleteProduct(idBorrar)
      assert.strictEqual(status, 200)
      assert.strictEqual(JSON.stringify(data), JSON.stringify({ messaje: 'producto borrado con exito' }))
    })
  
})