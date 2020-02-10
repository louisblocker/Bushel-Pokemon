import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NameBar from './NameBar';

export default class ZoomState extends React.Component {
    render () {
        const stats = this.props.pokemon.stats
        return (
            <div id="statblock">
                HP: {stats.hp} <br />
                Attack: {stats.attack} <br />
                Defense: {stats.defense} <br />
                Speed: {stats.speed}  <br />
                Sp. Att: {stats["special-attack"]} <br />
                Sp. Def: {stats["special-defense"]} <br />
            </div>
        );
    }
}