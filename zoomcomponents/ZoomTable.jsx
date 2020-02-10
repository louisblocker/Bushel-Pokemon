import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ZoomStat from './ZoomStat';
import ZoomType from './ZoomType'

export default class ZoomTable extends React.Component {
    render() {
        const pokemon = this.props.pokemon;
        return (
            <div id = "ZoomTable">
                <ZoomType pokemon = {pokemon} />
                <hr />
                <ZoomStat pokemon = {pokemon} />
                <p class = "genus"> {pokemon.genus} </p>
                <p class = "description"> {pokemon.description} </p>
                <p class = "profile"> Profile </p>
                <p>Height: {pokemon.height} </p>
                <p>Weight: {pokemon.weight}</p>
                <p>Abilities: {pokemon.abilities} </p>
                <p>Egg Group: {pokemon.egg_groups}</p>
            </div>
        )
    }
}