import React from 'react';
import ReactDOM from 'react-dom';

export default class NameBar extends React.Component {
    render () {
    const pokemon_name = this.props.pokemon.name;
    return (
        <div className = "zoomname">
           {pokemon_name}
        </div>
    );
}
}