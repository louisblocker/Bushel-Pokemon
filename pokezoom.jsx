import React from 'react';
import ReactDOM from 'react-dom';
import DetailPull from './detailpull';
import "./style.css"
import ZoomTopBar from './zoomcomponents/ZoomTopBar';
import ZoomImage from './zoomcomponents/ZoomImage';
import ZoomTable from './zoomcomponents/ZoomTable';
import ZoomStat from './zoomcomponents/ZoomStat';
import PokemonPull from './axiospull.jsx';
import {PokeDex} from './pokemon.jsx';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

export default class Pokemon_Zoom extends React.Component {
    constructor(props) {
            super(props)
            this.state = {
                resolved: false,
                pokemon: {},
            };
        }
        componentDidMount (){
            const idstring = window.location.pathname;
            const id = idstring.split('""').join("").split('/id/').join("");
            DetailPull(id).then((response) => {
                    this.setState({resolved: true, pokemon: response.data});
                  });
            }
        render () {
        

        if (!this.state.resolved){return (
            <div>
                Loading...
            </div>
        )}
        if (this.state.resolved) {return (
            <div id = "PokeZoom">
                <ZoomImage pokemon = {this.state.pokemon} />
                <ZoomTopBar pokemon = {this.state.pokemon} />
                <ZoomTable pokemon = {this.state.pokemon} />
        </div>
        );}
    }
}