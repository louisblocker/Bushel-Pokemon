import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";


export default function PagesPull(page) {
  return axios.get("https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=" + page)
  .then((response) => {
      return response.data;
  });  
}