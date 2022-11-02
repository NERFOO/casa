import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Global from './../Global';
import logo from './../assets/images/logoStrangerThings.png';

export default class Menu extends Component {

    state = {
        status : false ,
        series : []
    }

    cargarSeries = () => {
        var request = "/api/Series/";
        var url = Global.url + request;

        axios.get(url).then( res => {
            this.setState({
                status : true ,
                series : res.data
            })
        })
    }
    componentDidMount = () => {
        this.cargarSeries();
    }

    render() {
        return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <img src={logo} style={{width:"100px"}} />

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="/" >Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/newPersonaje/">Nuevo personaje</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/updatePersonaje/">Modificar personaje</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Series</a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        {
                            this.state.series.map((serie, index) => {
                                return(<li key={index}>
                                    <NavLink to={`/serie/${serie.idSerie}/`}>{serie.nombre}</NavLink>
                                </li>)
                            })
                        }
                    </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>)
    }
}
