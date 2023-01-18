import userRouter from '../router/userRoutes.js';
import productosRoutes from '../router/productosRoutes.js';
import numerosRouter from '../router/random.js';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';
import socket from '../utils/socket.js';
import { engine } from 'express-handlebars';
import session from '../utils/session.js';
import passport from '../utils/passport.js';
import { User } from "../persistence/models/UserModel.js";
import { auth } from '../controllers/userController.js';
// import yargs from 'yargs/yargs';
import { infoProcess } from '../utils/info.js';
import cluster from 'cluster';
import { logger } from '../utils/logger.js'
import compression from 'compression'
import os from 'os';
import { config } from 'dotenv'
config()

const numCPUs = os.cpus().length
const modoCluster = process.argv[3] == 'CLUSTER'
const app = express()
const http = new HTTPServer(app)
const io = new IOServer(http)
socket(io);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join('src', 'public')))
app.use(session);
app.use(passport.initialize())
app.use(passport.session())


app.set('views', path.join(__dirname, '../public/views'));
app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', auth, async (req, res) => {
  let idSession = await req.session.passport.user
  let infoUser = await User.findOne({ '_id': idSession })
  const userInfo = infoUser.email;
  if (userInfo) {
    res.render('form', { userInfo });
  }
  else {
    res.render('login')
  }
})
estadoCompresion(process.argv[5])

app.use('/api', userRouter);
app.use('/api', productosRoutes);
app.use('/api', numerosRouter);
app.use((req, res) => {
  logger.warn('Error de ruta - No encontrada')
  res.status(404).render('failRoute')
})

const PORT = process.argv[2] || 3000
app.set('port', PORT)

if (modoCluster && cluster.isPrimary) {
  logger.info(`Número de procesadores: ${numCPUs}`)
  logger.info(`PID MASTER ${process.pid}`)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', worker => {
    logger.info('Worker', worker.process.pid, 'died', new Date().toLocaleString())
    cluster.fork()
  })
}
else {
  estadoNgix(process.argv[4])
}

// const args = yargs(process.argv.slice(2))
//     .default('puerto', 8080)
//     .argv
// app.set('port', args.puerto)

// const connectedServer = http.listen(app.get('port'), () => {
//   console.log(`Servidor http con web sockets, escuchando en puerto: ${app.get('port')}`)
// })
// connectedServer.on("error", error => console.log)


function estadoNgix(nginx) {
  if (nginx === 'NGINX') {
    if (app.get('port') == 8080) {
      const appRandom = express()
      appRandom.use('/api/randoms', router)
      appRandom.listen(PORT, err => {
        if (!err) logger.info(`Servidor express escuchando en el puerto ${app.get('port')} - PID WORKER ${process.pid}`)
      })
      appRandom.get('/api/randoms', (req, res) => {
        res.send(`Server en PORT(${app.get('port')}) - PID(${process.pid}) - FYH(${new Date().toLocaleString()})`)
      })
    } else {
      http.listen(app.get('port'), (err) => {
        if (err) return logger.error('error en listen server', err);
        logger.info(`Servidor express escuchando en el puerto ${app.get('port')} - PID WORKER ${process.pid}`)
      })
    }
  }
  if (nginx !== 'NGINX') {
    http.listen(app.get('port'), (err) => {
      if (err) return logger.error('error en listen server', err);
      logger.info(`Servidor express escuchando en el puerto ${app.get('port')} - PID WORKER ${process.pid}`)
    })
  }
}

function estadoCompresion(usaCompresion){
  if(usaCompresion === 'COMPRESION'){
    app.use(compression())
    app.get('/info', compression({level: 8, threshold: 1}), infoProcess)
    return 0
  }else{
    app.get('/info', infoProcess)
  }
}

