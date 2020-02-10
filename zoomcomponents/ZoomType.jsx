import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ZoomType extends React.Component {
    render() {
        const types = [];
      this.props.pokemon.types.forEach((poke) => {
        types.push(
          <Pokemon_Type type = {poke}
          key = {poke.id} />
        );
      }); 
        return (
            <div id = "ZoomTypes">
                {types}
            </div>
        )
    }
}

class Pokemon_Type extends React.Component {
    render () {
        const type = this.props.type.toUpperCase()
        return (
            <span className = "types">{type} </span>     
        )
    }
}