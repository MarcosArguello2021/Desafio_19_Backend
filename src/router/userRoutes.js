import { Router } from "express";
const userRouter = Router();
import { productosRandom } from '../utils/faker.js';
import { logout, signin, signup, auth, usersDTO } from '../controllers/userController.js'


userRouter.get('/login', (req, res) => res.render('login'))
userRouter.post('/login', signin);
userRouter.get('/logout', logout);
userRouter.get('/registro', (req, res) => res.render('register'))
userRouter.post('/registro', signup)

userRouter.get('/error-login', (req, res) => res.render('faillogin'))
userRouter.get('/error-registro', (req, res) => res.render('failregister'))

// userRouter.get('/productos-test', auth ,async (req, res) => {
//     try {
//         const productosFaker = productosRandom();
//         res.json(productosFaker);
//     } catch (err) {
//         res.status(500).send(`No se puede recuperar los datos ${err}`);
//     }
// });

userRouter.get('/userDTO', auth , async (req, res) => {
    try {
        const usuariosDTO = await usersDTO(req, res);
        res.json(usuariosDTO);
    } catch (err) {
        res.status(500).send(`No se puede recuperar los datos ${err}`);
    }
});


export default userRouter;