import request from "supertest";
const req = request('http://localhost:3000/api/productos')

let idModificar = '63c7120e5c4ff387bd18dacf'; 
let idBorrar = '63c7fc70986d90041abf1e24'

describe('Prueba Supertest', function () {

    describe('Supertest', function () {

        it("CONSULTAR TODOS LOS PRODUCTOS - contiene status 200", (done) => {
            req.get("/")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200, done)
        })

        it("GUARDAR PRODUCTO - contiene status 200 y y un array con un mensaje de exito", (done) => {
            const datos = {
                name: "supertest prod",
                price: 123,
                urlImage: "supertest image",
                description: "supertest description",
                code: 123456,
                stock: 123
            }
            req.post("/")
                .send(datos)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .expect({ messaje: 'producto guardado con exito' })
                .end((err) => {
                    if (err) return done(err)
                    done()
                })
        })

        it("ACTUALIZAR PRODUCTO - contiene status 200 y y un array con un mensaje de exito", (done) => {
            const datos = {
                name: "supertest modificado prod",
                price: 123,
                urlImage: "supertest modificado image",
                description: "supertest description",
                code: 123456,
                stock: 123
            }
            req.put(`/${idModificar}`)
                .send(datos)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .expect({ messaje: 'producto actualizado con exito' })
                .end((err) => {
                    if (err) return done(err)
                    done()
                })
        })

        it("BORRAR PRODUCTO - contiene status 200 y y un array con un mensaje de exito", (done) => {
            req.delete(`/${idBorrar}`)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .expect({ messaje: 'producto borrado con exito' }, done)
        })
    })
})