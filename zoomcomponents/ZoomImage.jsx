import React from 'react';
import ReactDOM from 'react-dom';

export default class ZoomImage extends React.Component {
    render () {
        const pokemon_image = this.props.pokemon.image;
        const pokemon_name = this.props.pokemon.name;
        return (
            <div className = "ZoomImage">
                <img src={pokemon_image} alt={pokemon_name}></img>
            </div>
        )
    }
}