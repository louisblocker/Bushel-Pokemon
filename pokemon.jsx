import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PokemonPull from './axiospull.jsx';
import "./style.css";
import Pokemon_Zoom from './pokezoom.jsx';
import PagesPull from './pagespull'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch
} from "react-router-dom";

class Pokemon_Types extends React.Component {
    render () {
        const pokemon_type = this.props.pokemon.types.join(" ");
        return (
            <div className = "types" 
            text = "Roboto-bold">
              {pokemon_type}
            </div>
        );
    }
}
 
class Pokemon_Image extends React.Component {
    render () {
        const pokemon_image = this.props.pokemon.image;
        const pokemon_name = this.props.pokemon.name;
        return (
            <div className = "image">
                <img src={pokemon_image} alt={pokemon_name}></img>
            </div>
        );
    }
}

class Pokemon_Name extends React.Component {
    render () {
        const pokemon_name = this.props.pokemon.name;
        return (
            <div className = "name">
               {pokemon_name}
            </div>
        );
    }
}

class Pokemon_Number extends React.Component {
    render () {
        const pokemon_number = this.props.pokemon.id;
        return (
            <div className = "id">
                {pokemon_number}
            </div>
        );
    }
}

class Pokemon_Card extends React.Component {
  render () {
    const pokemon = this.props.pokemon;
    let id = pokemon.id;
    
    return (
      <div className = "card" id = {this.props.pokemon.name}>
        <Link to = {`/id/${id}`}>
          <Pokemon_Name pokemon = {this.props.pokemon} />
          <hr />
          <Pokemon_Image pokemon = {this.props.pokemon} />
          </Link>
      </div>
    )
  }
}

class PokeTable extends React.Component {
    render() {  
      const cards = [];
      this.props.pokemon.forEach((poke) => {
        cards.push(
          <Pokemon_Card pokemon = {poke}
          key = {poke.id} />
        );
      }); 

      return (         
          <div id = "PokeTable">
            {cards}
          </div>
      );
    }
  }

class PokeDex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        pokemon: this.props.pokemon,
        filtered: [],
        page: parseInt(window.location.search.split('""').join("").split('&')[0].split('?page=').join("")),
        nextpage: parseInt(window.location.search.split('""').join("").split('&')[0].split('?page=').join("")) + 1,
        prevpage: parseInt(window.location.search.split('""').join("").split('&')[0].split('?page=').join("")) - 1,
        search: ""
    };
    this.handlechange = this.handlechange.bind(this);
    this.pagefilter = this.pagefilter.bind(this);
    this.pageup = this.pageup.bind(this);
    this.pageback = this.pageback.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
    this.searchfilter = this.searchfilter.bind(this);
}

pagefilter(page = this.state.page) {
  let pagenum = page;
  let currentpokemon = this.props.pokemon;
  let filteredpokemon = currentpokemon.filter( poke => {
    const pokeid = poke.id;
    const targetbot = (pagenum * 20) - 20;
    if (pokeid > targetbot && pokeid <= targetbot + 20){
      return pokeid
    };
  })
  this.setState ({
    filtered: filteredpokemon
  });   
}

searchfilter(search = this.state.search) {
  let currentpokemon = [];
  let filteredpokemon = [];
  if (search !== ""){
    currentpokemon = this.props.pokemon;
    filteredpokemon = currentpokemon.filter( poke=> {
      const lcpoke = poke.name.toLowerCase();
      const filter = search.toLowerCase();
      return lcpoke.includes(filter);
    });}
    else {
    filteredpokemon = this.props.pokemon;
    }
    this.setState ({
      filtered: filteredpokemon
    }); 
}

pageup() {
  if (this.state.page !== 28) {
  this.pagefilter(this.state.page + 1);
  this.setState ((state) => ({
    page: state.page + 1,
    nextpage: state.page + 2,
    prevpage: state.page
  }));}
  else {
    this.setState ((state) => ({
      page: 28,
      nextpage: 28,
      prevpage: 27
    }));     
  }
  
}

pageback() {
  if (this.state.page !== 1) {
  this.pagefilter(this.state.page - 1);
  this.setState ((state) => ({
    page: state.page - 1,
    nextpage: state.page,
    prevpage: state.page - 2 
  }));}
  else {
    this.setState ((state) => ({
      page: 1,
      nextpage: 2,
      prevpage: 1
    }));     
  }
}

componentDidMount() {
  let search = window.location.search.split('""').join("").split('&')[1]
  this.pagefilter();
  if (search){
    this.searchfilter(window.location.search.split('""').join("").split('&')[1].split('search=').join(""));
    this.setState({search: window.location.search.split('""').join("").split('&')[1].split('search=').join("")});
  };
}

static getDerivedStateFromProps(nextProps, state) {
  if (nextProps.pokemon !== state.pokemon) {
  return {filtered: nextProps.pokemon}
}
else {return null}
}

handlesubmit(event) {
  event.preventDefault();
  var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?search=${this.state.search}`;
  window.history.pushState({path:newurl},'',newurl);
  this.searchfilter();
}

handlechange(names) {
  this.setState({search: names.target.value});
  event.preventDefault();
}

  render() {
    if (document.location.search === "") 
      {document.location.search = "?page=1"};
      return (
        <div id= "PokeDex">
          
          <form onSubmit = {this.handlesubmit} >
          <span className = "magnifying-glass" />
          <input type="text" id = "searchbar" className = "input" value={this.state.search} onChange = {this.handlechange} placeholder="Search Pok&eacute;dex" />
          </form>
          
          <PokeTable pokemon = {this.state.filtered} />
          <span id= "footer">
          <Link to={`/?page=${this.state.prevpage}`} onClick = {this.pageback} id = "backarrow"></Link>
          <Link to={`/?page=${this.state.nextpage}`} onClick = {this.pageup} id = "frontarrow"></Link>
          </span>
        </div>
    );
    }
}

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([PokemonPull(1),PokemonPull(2),PokemonPull(3),PokemonPull(4),PokemonPull(5),PokemonPull(6),PokemonPull(7),PokemonPull(8),PokemonPull(9),PokemonPull(10),PokemonPull(11),PokemonPull(12),PokemonPull(13),PokemonPull(14),PokemonPull(15),PokemonPull(16),PokemonPull(17),PokemonPull(18),PokemonPull(19),PokemonPull(20),PokemonPull(21),PokemonPull(22),PokemonPull(23),PokemonPull(24),PokemonPull(25),PokemonPull(26),PokemonPull(27),PokemonPull(28),PokemonPull(29),PokemonPull(30),PokemonPull(31),PokemonPull(32),PokemonPull(33),PokemonPull(34),PokemonPull(35),PokemonPull(36),PokemonPull(37)]).then ((response) => {
    var pokemon = [];
    response.forEach((page) => {
      pokemon = pokemon.concat(page.data);
    })
    window.POKEMON = pokemon; 
    ReactDOM.render(
      <Router>
        <Switch>
          <Route exact path = '/'>
            <PokeDex pokemon = {POKEMON} />
          </Route>
          <Route path = "/id/">
             <Pokemon_Zoom /></Route>
        </Switch>
      </Router>,
  document.getElementById('root'))})
})

export {PokeDex}