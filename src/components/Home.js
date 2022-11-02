import React, { Component } from 'react';
import collage from './../assets/images/series.jpg';

export default class Home extends Component {
    render() {
        return (<div>
            <h1>Home</h1>

            <img src={collage} alt='collage series' style={{width:"100%"}}/>
        </div>)
    }
}
