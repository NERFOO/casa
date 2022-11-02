import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../Global';

export default class Personajes extends Component {

    state = {
        status : false ,
        personaje : []
    }

    cargarPersonaje = () => {
        var id = this.props.id;
        var request = "/api/Series/PersonajesSerie/" + id;
        var url = Global.url + request;

        axios.get(url).then( res => {
            this.setState({
                status : true ,
                personaje : res.data
            })
        })
    }
    componentDidMount = () => {
        this.cargarPersonaje();
    }

    render() {
        return (<div>
            <br />
            <NavLink to={`/serie/${this.props.id}/`} className='btn btn-danger'>Volver</NavLink>
            <br /><br />

            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Personaje</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.personaje.map((pers, index) => {
                            return(<tr key={index}>
                                <td><img src={pers.imagen} alt="img" style={{width:"100px"}} /></td>
                                <td>{pers.nombre}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>)
    }
}
