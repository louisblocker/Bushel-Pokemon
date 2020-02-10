import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

export default function PokemonPull(i) {
    return axios.get("https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=" + i)
    .then((response) => {
        return response.data;
    }); 
}