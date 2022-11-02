import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class DetalleSerie extends Component {

    state = {
        status : false ,
        serie : {}
    }

    cargarSerie = () => {
        var id = this.props.id;
        var request = "/api/Series/" + id;
        var url = Global.url + request;

        axios.get(url).then(res => {
            this.setState({
                status : true ,
                serie : res.data
            })
        })
    }
    componentDidMount = () => {
        this.cargarSerie();
    }
    componentDidUpdate = (oldProps) => {
        if(this.props.id != oldProps.id) {
            this.cargarSerie();
            console.log("Cambio de serie")
        }
    }

    render() {
        return (<div className="card" style={{width: "18rem"}}>
            <img src={this.state.serie.imagen} className="card-img-top" alt="" />
            <div className="card-body">
                <h5 className="card-title">{this.state.serie.nombre}</h5>
                <p className="card-text">{this.state.serie.puntuacion}</p>
                <NavLink to={`/personajes/${this.props.id}`} className="btn btn-success">Personajes</NavLink>
            </div>
    </div>)
    }
}
