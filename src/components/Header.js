import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import styles from '../App.css';

class Header extends Component {
    render() {
        return (
            <Navbar 
                fluid={true}
                className={styles.kimNavbar}
                collapseOnSelect 
                onSelect={(key) => {
                this.props.pusher(key);
            }}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#"><span className="cWhite">Kim's Home</span></a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey="/customers"><span className="cNav">Customers</span></NavItem>
                        <NavItem eventKey={2} href="#"><span className="cNav">Products</span></NavItem>
                        <NavItem eventKey={3} href="#"><span className="cNav">Reports</span></NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#"><span className="cLog">Login</span></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default connect()(Header);