import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

export default function DetailPull(id) {
    return axios.get('https://intern-pokedex.myriadapps.com/api/v1/pokemon/' + id)
    .then((response) => {
        return response.data;
    }); 
}