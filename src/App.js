import './App.css';
import 'antd/dist/antd.css'

import React from "react";
import Routes from "./Routes/routes";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import store from "../src/store/store";

export const persistor = persistStore(store);

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Routes/>
                </PersistGate>
            </Provider>
        </div>
    );
}

export default App;

// import React, { Component, Fragment } from 'react';
// import {PDFViewer} from '@react-pdf/renderer'
// import Invoice from './containers/Invoice/invoice'
// import invoiceData from './data/invoice_data'

// // import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//     render() {
//         return (
//             <Fragment>{console.log(invoiceData)}
//                
//             </Fragment>
//         );
//     }
// }

// export default App;
