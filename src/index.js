import React from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

axios.defaults.baseURL = process.env.REACT_APP_BASE_PATH;

TimeAgo.addDefaultLocale(en)
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
