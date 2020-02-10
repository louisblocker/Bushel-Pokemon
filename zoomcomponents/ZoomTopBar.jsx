import React from 'react';
import ReactDOM from 'react-dom';
import NameBar from './NameBar';
import ZoomNumber from './ZoomNumber';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

export default class ZoomTopBar extends React.Component {
    render () {
        return (
            <div className = 'topbar'>
                <Link to="/" id = "zoombackarrow" />
                <NameBar pokemon = {this.props.pokemon} />
                <ZoomNumber pokemon = {this.props.pokemon} />
            </div>
        )
    }
}