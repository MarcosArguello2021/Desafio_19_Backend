import ChatsDaoFactory from '../DAO/selectDB.js';
import { productosRandom } from './faker.js';
import { normalizeData } from './normalizr.js'
import { logger } from './logger.js'

const  chatDao = ChatsDaoFactory.getDao();

export default async (io) => {
  io.on('connection', async (socket) => {
    logger.info('Usuario conectado')
    const productos = productosRandom();
    socket.emit('lista_productos', productos)
    let chat = await chatDao.getAll();
    const chatNormalizado = normalizeData(chat);
    socket.emit('lista_chat', chat)

    socket.on('cliente_nuevo_mensaje_chat', async data => {
      await chatDao.save(data)
      let chat = await chatDao.getAll();
      io.sockets.emit('lista_chat', chat)
    })
  })
}
