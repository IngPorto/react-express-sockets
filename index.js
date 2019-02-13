/**
 * Esta clase no es funcional, solo sirve para now.sh
 */
const express = require('express')
const app = express()
const path = require('path')

//Rutas
const { Router } = require ('express')
const router = Router()
router.get('/', async (req, res)=>{
    res.render('index.html')
})
app.use(router)
app.use(express.static(path.join(__dirname, 'public')))


// socket.io
const http = require('http')
const socketIo = require('socket.io')
const server = http.createServer(app)
const io = socketIo(server)


io.on('connection', socket =>{
    console.log('socket conectado: ' + socket.id)
    socket.on('clienteEmiteMensaje', mensaje =>{
        console.log('Nuevo mensaje enviado del clietne: '+mensaje)
        socket.broadcast.emit('servidorEmiteMensaje', {
            mensaje,
            from: socket.id
        })
    })
    socket.on("disconnect", () => console.log("Client disconnected"));
})

server.listen(3000, () => {
    console.log('Server en línea sobre el puerto 3000')
})
