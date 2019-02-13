/**
 * Guiarme de aquí:
 * https://www.youtube.com/watch?v=84GXJANOYFw
 */
import React, {Component} from 'react'
import io from 'socket.io-client'

class Main extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            mensajes: []
        }
    }
    // una vez ya está montado mi componente iniciar la 
    // conección por socket a ('/'), que es mi servidor
    componentDidMount(){
        this.socket = io('/')
        this.socket.on('servidorEmiteMensaje', (newMes) => {
            console.log("Nuevo mensaje desde el server: "+newMes.mensaje)
            this.setState({
                mensajes: [...this.state.mensajes, newMes]
            })            
        })
    }

    handleSubmit (e){
        const newMes = e.target.value
        // Botón Enter = 13
        if(e.keyCode === 13 && newMes){
            this.socket.emit('clienteEmiteMensaje', newMes)
            e.target.value = ''
            this.setState({
                mensajes: [
                    ...this.state.mensajes, 
                    { 
                        mensaje: newMes , 
                        from: 'me'
                    }
                ]
            })
        }
    }

    render(){
        const mensajes = this.state.mensajes.map(mensaje => {
            return (
                <li>{mensaje.from} : {mensaje.mensaje}</li>
            )
        })
        return(
            <div id="Main">
                <h1>Socket-Chat</h1>
                <a href="https://github.com/ingporto">
                    <img src="./img/nav_brand.png" height="25" width="25"/>
                    <p>@ingporto</p>
                </a>
                <input 
                    type="text"
                    placeholder="Mensaje"
                    onKeyUp={this.handleSubmit.bind(this)}
                />
                <hr />
                <ul>
                    {
                        mensajes
                    }
                </ul>
            </div>
        )
    }
}

export default Main;