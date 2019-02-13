const express = require('express')
const app = express()
const path = require('path')

// socket.io
const http = require('http')
const socketIo = require('socket.io')
const server = http.createServer(app)
const io = socketIo(server)

// webpack 
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config_webpack = require('./webpack.config')

// middleware
// Me va a permitir traducir react cada vez que haya una consulta al servidor
app.use(webpackDevMiddleware(webpack(config_webpack)))

app.use(express.static(path.join(__dirname, 'public')))


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
