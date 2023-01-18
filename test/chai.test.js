import { assert } from 'chai';
import {
  getProductos,
  postProduct,
  updateProduct,
  deleteProduct
} from './axios.request.js'

let code = 99999;

describe('Ecommerce - Prueba Chai', function () {

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
      const { status, data } = await updateProduct(code)
      assert.equal(status, 200)
      assert.typeOf(data, 'object')
      assert.equal(JSON.stringify(data), JSON.stringify({ messaje: 'producto actualizado con exito' }))
    })

    it('BORRAR PRODUCTO - contiene status 200 y y un array con un mensaje de exito', async function () {
      const { status, data } = await deleteProduct(code)
      assert.equal(status, 200)
      assert.typeOf(data, 'object')
      assert.equal(JSON.stringify(data), JSON.stringify({ messaje: 'producto borrado con exito' }))
    })
  
})