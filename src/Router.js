import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import DetalleSerie from './components/DetalleSerie';
import Personajes from './components/Personajes';
import CreatePersonaje from './components/CreatePersonaje';
import UpdatePersonaje from './components/UpdatePersonaje';

export default class Router extends Component {
    render() {

        function DetalleSeries() {
            var { id } = useParams();
            return(<DetalleSerie id={id} />)
        }

        function VolverDetalle() {
            var { id } = useParams();
            return(<Personajes id={id} />)
        }

        return (<div>
            <BrowserRouter>
            <Menu />
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/serie/:id/' element={<DetalleSeries />}/>
                    <Route path='/personajes/:id/' element={<VolverDetalle />}/>
                    <Route path='/newPersonaje/' element={<CreatePersonaje />}/>
                    <Route path='/UpdatePersonaje/' element={<UpdatePersonaje />}/>
                </Routes>
            </BrowserRouter>
        </div>)
    }
}
