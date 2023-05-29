import React from 'react';
import UserContext,{ContextLogin,UserConsumer} from '../context/context'
import {ValidarAmbienteService} from '../validarAmbiente/validarAmbiente';
import ProfilePage from '../profile/profile';
export default class Home extends React.Component {
    static contextType = UserContext;
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
        /*const {userIdRol} = this.context;
        let ambiente = this.validarAmbienteService.getAmbiente();
        this.postData(ambiente+'/tablerosroles/gettablerosroles/',{roles_idroles:userIdRol});
        this.handleLogStatus();*/
      }
      handleLogStatus(){
        const {islogin} = this.context;
        if(islogin != true){
          //window.location.replace("/login");
        }
      }
      handleLogoutClick() {
        const {logOut} = this.context;
        //this.isLoggedIn = false;
        //logOut();
        //window.location.replace("/");
        
      }
    render() {
        let i = 0;
        const { dataUser } = this.state;
        return(
          <ProfilePage />
        )
    }
}