import React, { Component } from 'react';
import './App.css';
import {
  Routes,Route
} from "react-router-dom";
import Login from './login/login';
import ErrorPage from "./error-page";
import Contenedor from './contenedor/contenedor';
import Usuarios from  './usuarios/tablero';
import Home from './home/home';
import ContenedorHome from './contenedorhome/contenedorHome';
class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Login />}>
          <Route path="contenedorHome" element={<ContenedorHome />}>
            <Route path="usuarios" element={<Usuarios />}/>
            <Route path="contenedor" element={<Contenedor />}/>
            <Route path="home" element={<Home />}/>
          </Route>
        </Route>
      </Routes>
    );
  }
}

export default App;