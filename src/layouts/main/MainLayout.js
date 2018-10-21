import React, { Component } from 'react';
import { Route, Link, NavLink as RRNavLink, withRouter } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavLink,
    Container,
    Row,
    Col,
    UncontrolledCollapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu
} from "reactstrap";
import { Aperture, ChevronDown, Settings, AlignLeft } from 'react-feather';
import mainRoutes from 'routes/main';

class MainLayout extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            active: false,
            toggleButtonStyle: 'black',
            currentPath: '',
        };
    }

    static getDerivedStateFromProps(props, state) {
        if(state.currentPath !== props.location.pathname) {
            return {
                currentPath: props.location.pathname
            }
        }
    }

    getCurrentPageName = (currentPath) => {
        for(var i=0; i<mainRoutes.length; i++) {
            const route = mainRoutes[i];
            if(route.path === currentPath) {
                return route.name;
            }
            if(route.subRoutes) {
                for(var j=0; j<route.subRoutes.length; j++) {
                    const subRoute = route.subRoutes[j];
                    if(subRoute.path === currentPath) {
                        return subRoute.name;
                    }
                }
            }
        }
        return '';
    }

    toggle = () => {
        this.setState({
            active: !this.state.active
        });
    }

    onMouseEnterToggle = () => {
        this.setState({
            toggleButtonStyle: '#30C0AA'
        });
    }

    onMouseLeaveToggle = () => {
        this.setState({
            toggleButtonStyle: 'black'
        });
    }

    signOut = () => {
        this.props.history.push('/auth/signIn');
    }

    render() {
        const { active, toggleButtonStyle, currentPath } = this.state;
        return (
            <div>
                {/* Sidebar */}
                <Nav id="sidebar" className={active ? 'active' : null} vertical>
                    <NavLink to="/main/home" className={'homeButton'} tag={Link} style={{fontSize:'18px', padding:'1.15rem 1.25rem'}}>
                        <Aperture size={28} color={'#30C0AA'} style={{marginRight:'.75rem'}}/>Sample Project
                    </NavLink>
                    
                    {mainRoutes.map((route, key) => {
                        if(route.subRoutes) {
                            let menus = [];
                            menus.push(
                                <NavLink to={"#"} className={'menu'} tag={RRNavLink} style={{fontSize:'15px', padding:'.5rem 1rem'}} id={"toggle" + key} key={key}>
                                    <route.icon size={20} color={'white'} style={{marginLeft:'.4rem', marginRight:'.75rem'}}/>
                                    {route.name}
                                    <ChevronDown size={14} style={{position:'absolute', right:'15px', marginTop:'5px'}}/>
                                </NavLink>
                            );
                            
                            route.subRoutes.map((subRoute, subKey) => {
                                menus.push(
                                    <UncontrolledCollapse toggler={"#toggle" + key} key={subKey}>
                                        <NavLink to={subRoute.path} className={'submenu'} tag={RRNavLink} style={{fontSize:'15px', paddingTop:'.5rem', paddingBottom:'.5rem', paddingLeft:'4.5rem'}}>
                                            {subRoute.name}
                                        </NavLink>
                                    </UncontrolledCollapse>
                                )
                            });

                            return menus;
                        }else {
                            return (
                                <NavLink to={route.path} className={'menu'} tag={RRNavLink} style={{fontSize:'15px', padding:'.5rem 1rem'}} key={key}>
                                    <route.icon size={20} color={'white'} style={{marginLeft:'.4rem', marginRight:'.75rem'}}/>
                                    {route.name}
                                </NavLink>
                            )

                        }
                    })}
                    
                </Nav>
                
                {/* Header */}
                <Navbar id="header" className={active ? 'active' : null} color="light" light expand="md">
                    <NavbarBrand onClick={this.toggle} onMouseEnter={this.onMouseEnterToggle} onMouseLeave={this.onMouseLeaveToggle} style={{cursor:'pointer'}}>
                        <AlignLeft size={25} color={toggleButtonStyle}/>
                    </NavbarBrand>
                    <NavbarBrand>
                        {this.getCurrentPageName(currentPath)}
                    </NavbarBrand>
                    <Nav className="ml-auto">
                        <UncontrolledDropdown>
                            <DropdownToggle nav style={{color:'black'}}>
                                <Settings size={20}/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.signOut}>
                                    Sign out
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Navbar>

                {/* Content */}
                <div id="content" className={active ? 'active' : null}>

                    {/* Inner Content */}
                    <Container id="innerContent" fluid style={{padding:'1rem'}}>
                        <Row noGutters>
                            <Col style={{padding:'1rem', background:'#fff'}}>
                                {mainRoutes.map((route, key) => {
                                    if(route.subRoutes) {
                                        let subRoutes = [];
                                        route.subRoutes.map((subRoute, subKey) => {
                                            subRoutes.push(
                                                <Route path={subRoute.path} component={subRoute.component} key={subKey}/>    
                                            )
                                        });
                                        return subRoutes;

                                    }else {
                                        return (
                                            <Route path={route.path} component={route.component} key={key}/>
                                        )
                                    }
                                
                                })}
                            </Col>
                        </Row>
                    </Container>

                    {/* Footer */}
                    <div className="footer small" align="right">
                        <ul className="list-inline">
                            <li className="list-inline-item" style={{color:'#6C757D'}}>
                                Developed by 권혁찬
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MainLayout);