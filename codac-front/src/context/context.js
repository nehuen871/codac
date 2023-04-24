import React,{Component} from 'react';
const UserContext = React.createContext();
export const UserConsumer = UserContext.Consumer;
export class ContextLogin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            islogin: false,
            userIdRol: 0,
            userName: "",
            userId:0
        }
    }


    logIn = (log,rol,id,name) => {
        this.setState({
            islogin:log,
            userIdRol:rol,
            userId:id,
            userName:name
        });
    }
    logOut = () => {
        this.setState({
            islogin:false,
            userIdRol:0,
            userId:0,
            userName:""
        });
    }
    render(){
        const {islogin,userIdRol,userId,userName} = this.state
        const {logIn,logOut} = this;
        return(
            <UserContext.Provider value={{
                islogin,
                userIdRol,
                userId,
                userName,
                logIn,
                logOut
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    };
}
export default UserContext;