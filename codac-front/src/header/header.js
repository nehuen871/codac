import React from 'react';
import UserContext,{ContextLogin,UserConsumer} from '../context/context'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Justify,PersonCircle } from 'react-bootstrap-icons';
import SidebarMenu from '../contenedor/contenedor'
import { Image } from 'react-bootstrap';
export default class HeaderApp extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        const {islogin,userIdRol,logIn,logOut} = this.context;
        if(islogin != true){
            //window.location.replace("/login");
        }
    }
    render() {
      const {islogin,userIdRol,userName,logIn,logOut} = this.context;
        return(
          <>
          {[false].map((expand) => (
            <Navbar key={expand} bg="" expand={expand} className="mb-3" style={{ backgroundColor:"#6c757d",height: "80px"}}>
              <Container fluid>
                <Navbar.Brand className="position-absolute bottom-0 end-0"href="#" style={{ height: "100%"}}>{userName}<PersonCircle style={{left:"30px",top:"45px",height:"40px",width: "40px"}}/></Navbar.Brand>
                <Navbar.Toggle  aria-controls={`offcanvasNavbar-expand-${expand}`}>
                  <Justify style={{left:"30px",top:"45px",height:"40px",width: "40px"}}/>
                </Navbar.Toggle>
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="start"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      Tableros
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <SidebarMenu />
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
                <div className="position-absolute" style={{display: "inline",width: "80px",height: "80px",left: "65px"}}>
                  <Image src={'/LOGOBABLANCO_PNG.png'} style={{ width: "100%", height: "100%"}}/>
                </div>
              </Container>
            </Navbar>
          ))}
        </>
        )
    }
}

HeaderApp.contextType = UserContext;