import React from 'react';
import {
    Outlet
  } from "react-router-dom";
import UserContext,{ContextLogin,UserConsumer} from '../context/context'
export default class ContenedorHome extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        const {islogin,userIdRol,logIn,logOut} = this.context;
        if(islogin != true){
           window.location.replace("/login");
        }
    }
    render() {
        return(
            <div className='row'>
                <div className='col-md-12'>
                    <Outlet roles_idroles={this.props.roles_idroles} idusuario={this.props.idusuario}/>
                </div>
            </div>
        )
    }
}