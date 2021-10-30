import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Trouglovi from './Trouglovi';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Trouglovi

    //top and bot colors
    botcolor = { "#221A33" }
    topcolor = { "#8A3D99" }

    //color variations
    hue = { 0.2 } //hue variation
    sat = { 0 } //saturation variation
    val = { 0.15 } //value variation

    //triangle count
    countx = { 10 }
    county = { 10 }

    //equilateral - if true ignores 'countx', and forces 'county'
    equilateral = { true }

  />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register();