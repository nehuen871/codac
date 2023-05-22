import React,{ useState } from 'react'
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu
} from "react-pro-sidebar";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import UserContext,{ContextLogin} from '../context/context'
import {ValidarAmbienteService} from '../validarAmbiente/validarAmbiente';

export default class SidebarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.navegacion = [];
    this.state = {
      isLoggedIn: false,
      dataUser:null
    };
    let data1 = [];
    this.validarAmbienteService = new ValidarAmbienteService();
    this.handleLogStatus = this.handleLogStatus.bind(this);
    this.postData = this.postData.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
}
async postData(url = '', data = {}) {
  let i = 0;
  const that = this;
  // Default options are marked with *
  await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //mode: 'cors', // no-cors, *cors, same-origin
    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    //redirect: 'follow', // manual, *follow, error
    //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header 
  }).then(function(response) {
    return response.json();
    }).then(function(jsonStr) {
    that.setState({ dataUser: jsonStr });
  });
  /**/
  //return response.json(); // parses JSON response into native JavaScript objects
}
componentDidMount() {
  let ambiente = this.validarAmbienteService.getAmbiente();
  const {islogin,userIdRol,logIn,logOut} = this.context;
  this.postData(ambiente+'/tablerosroles/gettablerosroles/',{roles_idroles:userIdRol});
  this.handleLogStatus();
}
handleLogStatus(){
  const {islogin,userIdRol,logIn,logOut} = this.context;
  if(islogin != true){
    //window.location.replace("/login");
  }
}
handleLogoutClick() {
  const {islogin,userIdRol,logIn,logOut} = this.context;
  this.isLoggedIn = false;
  logOut();
  window.location.replace("/");
  
}
  render() {
    const {islogin,userIdRol,logIn,logOut} = this.context;
    let i = 0;
    const { dataUser } = this.state;
    //dataUser && console.log(dataUser.data.map(item => item));
    return(
      <div>
        <div>
            <Sidebar>
            <Menu iconShape="square">
              {userIdRol == 1 &&
                <SubMenu title="Sub Component 1" label="ABM">
                <MenuItem><Link to="/contenedorHome/usuarios">Usuarios</Link></MenuItem>
                <MenuItem><Link to="/contenedorHome/roles">Roles</Link></MenuItem>
                <MenuItem><Link to="/contenedorHome/tablero">Tableros</Link></MenuItem>
                <MenuItem><Link to="/contenedorHome/tablerosRoles">Tableros Roles</Link></MenuItem>
                <MenuItem><Link to="/contenedorHome/comentarios">Comentarios</Link></MenuItem>
                </SubMenu>
              }
                <MenuItem><Link to="/contenedorHome/home">Inicio</Link></MenuItem>
                 <MenuItem><a onClick={this.handleLogoutClick}>Salir</a></MenuItem>
            </Menu>
          </Sidebar>
        </div>
      </div> 
    );
  }
}

SidebarMenu.contextType = UserContext;

//{dataUser && dataUser.data.map(item =>  <MenuItem><Link to={"/powerbi/"+item.accessToken+"/"+item.id}>{item.nombre}</Link></MenuItem> )}