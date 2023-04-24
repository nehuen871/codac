import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Header from './header/header';
//import Footer from './footer/footer';
import {
  BrowserRouter,
} from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import UserContext,{ContextLogin} from './context/context'
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ProSidebarProvider>
      <ContextLogin>
        <Header />
        <App />
      </ContextLogin>
    </ProSidebarProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//  <Footer />
reportWebVitals();
