import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class CreatePersonaje extends Component {

    state = {
        statusSelect : false ,
        statusPost : false ,
        series : [] ,
        idSerieNew : 0
    }

    cargarSeries = () => {
        var request = "/api/Series/";
        var url = Global.url + request;

        axios.get(url).then( res => {
            this.setState({
                statusSelect : true ,
                series : res.data
            })
        })
    }
    componentDidMount = () => {
        this.cargarSeries();
    }

    nom = React.createRef();
    img = React.createRef();
    serie = React.createRef();

    crearSerie = (e) => {
        e.preventDefault();

        var nom = this.nom.current.value;
        var img = this.img.current.value;
        var serie = parseInt(this.serie.current.value);

        var data = {
            nombre : nom ,
            imagen : img ,
            idSerie : serie
        }

        var request = "/api/Personajes/";
        var url = Global.url + request;

        console.log(data);
        axios.post(url, data).then( res => {
            this.setState({
                statusPost : true ,
                idSerieNew : serie
            })
            console.log("añadido");
        })
    }

    render() {
        if(this.state.statusPost == true) {
            return(<Navigate to={`/personajes/${this.state.idSerieNew}`} />)
        } else {
            return (<div>
                <h1 style={{color:"blue"}}>Nuevo Personaje</h1>

                <form>
                    <label>Nombre</label>
                    <input type="text" className='form-control' ref={this.nom}/><br />
                    <label>Imagen</label>
                    <input type="text" className='form-control' ref={this.img}/><br />
                    <label>Serie</label>
                    <select ref={this.serie}>
                        {
                            this.state.series.map((serie, index) => {
                                return(<option key={index} value={serie.idSerie}>{serie.nombre}</option>)
                            })
                        }
                    </select>

                    <br /><br />
                    <button onClick={this.crearSerie} className='btn btn-success'>Insertar serie</button>
                </form>
            </div>)
        }
    }
}
