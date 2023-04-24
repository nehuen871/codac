import React from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {
  Navigate,
} from "react-router-dom";
import {useEffect,useState} from 'react';
import { LogintService } from './loginService';
import ContenedorHome from '../contenedorhome/contenedorHome';
import UserContext,{ContextLogin} from '../context/context';
import {ValidarAmbienteService} from '../validarAmbiente/validarAmbiente';
let row = [];
class Login extends React.Component{
  constructor(props) {
    super(props);
    this.logintService = new LogintService();
    this.validarAmbienteService = new ValidarAmbienteService();
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      dataUser:{
        apellido:"",
        area:"",
        idusuarios:"",
        nombre:"",
        pass:"",
        quit:"",
        roles_idroles: ""
      }
    };
    this.isLoggedIn = false;
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  handlePasswordChange(e){
    this.setState({password: e.target.value});
  }
  async handleLoginClick() {
    let {islogin,logIn} = this.context;
    row.pop();
    row.push({
      quit: this.state.email,
      pass: this.state.password
    });
    let useInfo = await this.logintService.getUser({row:row[0]});
    if(useInfo != null && useInfo != 0){
      logIn(true,useInfo.data.roles_idroles,useInfo.data.idusuarios,useInfo.data.nombre);
      this.setState({
        dataUser:{
          apellido:useInfo.data.apellido,
          area:useInfo.data.area,
          idusuarios:useInfo.data.idusuarios,
          nombre:useInfo.data.nombre,
          pass:useInfo.data.pass,
          quit:useInfo.data.quit,
          roles_idroles:useInfo.data.roles_idroles
      }});
      islogin = true;
    }
  }
  handleLogoutClick() {
    const {islogin,userIdRol,logIn,logOut} = this.context;
    islogin = false;
    logOut();
  }
  render() {
    const {islogin,userIdRol,logIn,logOut} = this.context;
    const isLoggedIn = islogin;

    return (
      <div>    
        {!isLoggedIn ? 
        <MDBContainer className="p-3 my-5 d-flex flex-column" style={{width:"30%"}}> 
        <MDBInput wrapperClass='mb-4' label='Quit' id='form1' type='email' value={this.state.email || ""} onChange={this.handleEmailChange}/>
        <MDBInput wrapperClass='mb-4' label='Contraseña' id='form2' type='password' value={this.state.password || ""} onChange={this.handlePasswordChange}/>
        <MDBBtn className="mb-4" style={{backgroundColor:"#fbbc04",borderColor:"#fbbc04",color:"black"}} onClick={this.handleLoginClick}>Acceder</MDBBtn>
        <div className="text-center">
          <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='facebook-f' size="sm"/>
            </MDBBtn>

            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='twitter' size="sm"/>
            </MDBBtn>

            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='google' size="sm"/>
            </MDBBtn>

            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='github' size="sm"/>
            </MDBBtn>

          </div>
        </div>
        </MDBContainer> : <ContenedorHome login={isLoggedIn} roles_idroles={this.state.roles_idroles} idusuario={this.state.idusuarios}/>
      }
      </div>
    );
  }
}

Login.contextType = UserContext;
export default Login;
