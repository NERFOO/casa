import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { Navigate, NavLink } from 'react-router-dom';

export default class UpdatePersonaje extends Component {

    state = {
        statusSerie : false ,
        serie : [] ,
        statusPersonaje : false ,
        personaje : [] ,
        statusSeries : false ,
        statusPersonajes : false ,
        series : [] ,
        personajes : [] ,
        idSerieNew : 0
    }

    cargarSeries = () => {
        var request = "/api/Series/";
        var url = Global.url + request;

        axios.get(url).then( res => {
            this.setState({
                statusSeries : true ,
                series : res.data
            })
        })
    }

    cargarPersonajes = () => {
        var request = "/api/Personajes/";
        var url = Global.url + request;

        axios.get(url).then( res => {
            this.setState({
                statusPersonajes : true ,
                personajes : res.data
            })
        })
    }

    componentDidMount = () => {
        this.cargarSeries();
        this.cargarPersonajes();
    }

    personaje = React.createRef();
    serie = React.createRef();

    updatePersonaje = (e) => {
        e.preventDefault();

        var idPersonaje = parseInt(this.personaje.current.value);
        var idSerie = parseInt(this.serie.current.value);
        var request = "/api/Personajes/" + idPersonaje + "/" + idSerie;
        var url = Global.url + request;

        var datos = {
            idPersonaje : idPersonaje ,
            idSerie : idSerie
        }

        axios.put(url, datos).then(res => {
            this.setState({
                statusPut : true ,
                idSerieNew : idSerie
            })
        })

        var requestSerie = "/api/Series/" + idSerie;
        var urlSerie = Global.url + requestSerie;

        axios.get(urlSerie).then( res => {
            this.setState({
                statusSerie : true ,
                serie : res.data
            })
        })

        var requestPersonaje = "/api/Personajes/" + idPersonaje;
        var urlPersonaje = Global.url + requestPersonaje;

        axios.get(urlPersonaje).then( res => {
            this.setState({
                statusPersonaje : true ,
                personaje : res.data
            })
        })
    }

    render() {
        if(this.state.statusPut == true) {
            return(<Navigate to={`/personajes/${this.state.idSerieNew}`} />)
        } else {
            return (<div>
                <h1>Personajes y series</h1>
                    <form>
                        <label>Seleccione una serie</label><br />
                        <select ref={this.serie} className='form-select'>
                            {
                                this.state.series.map((serie, index) => {
                                    return(<option key={index} value={serie.idSerie}>{serie.nombre}</option>)
                                })
                            }
                        </select>
                        <br />
                        <label>Seleccione un personaje</label><br />
                        <select ref={this.personaje} className='form-select'>
                            {
                                this.state.personajes.map((pers, index) => {
                                    return(<option key={index+100} value={pers.idPersonaje}>{pers.nombre}</option>)
                                })
                            }
                        </select>
                            <br />
                        <button onClick={this.updatePersonaje} className="btn btn-info">Guardar cambios</button>
                    </form>

                    <h2>{this.state.serie.nombre}</h2>
                    <img src={this.state.serie.imagen} style={{width:"100%"}} />
                    <h2>{this.state.personaje.nombre}</h2>
                    <img src={this.state.personaje.imagen} style={{width:"100%"}} />
            </div>)
        }
    }
}
