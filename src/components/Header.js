import React, { useContext, useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import cart from "../images/cart-sm.png"
import logo from "../images/logo-sm.png"
import "../css/Header.css"
import { AuthContext } from '../context/AuthContext'

function Header() {

    const {isAuth, isAuthenticated, signOut } = useContext(AuthContext);

    useEffect(() => {
        isAuthenticated();
    }, [isAuthenticated])

    return (
        <div className="nav-wrapper fixed-top navbar navbar-toggleable-sm navbar-expand-md">
            <div className="container">
                <Navbar className="w-100" collapseOnSelect expend="lg" variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Brand href="/reactStore/">
                        <img src={logo} alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="nav-justified w-100 nav-fill">
                            <Nav.Link href="/reactStore/">Store</Nav.Link>
                            {isAuth ? (
                                <>
                                    <Nav.Link onClick={signOut}>Logout</Nav.Link>
                                    <Nav.Link href="/reactStore/user/cart">
                                        <img src={cart} alt="cart" />
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link href="/reactStore/login">Login</Nav.Link>
                                    <Nav.Link href="/reactStore/user/cart">
                                        <img src={cart} alt="cart" />
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    )
}

export default Header