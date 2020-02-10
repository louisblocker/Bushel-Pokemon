import React from 'react';
import ReactDOM from 'react-dom';

export default class ZoomNumber extends React.Component {
    render () {
        const pokemon_id = this.props.pokemon.id;
        return (
            <div className = "zoomid">
                #{pokemon_id}
            </div>
        );
    }
}