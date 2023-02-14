import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import { logout } from "../modules/authManager";
import "../App.css";

export default function Header({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar className="navbar" color="dark" dark expand="md">
                <NavbarBrand className="App-brand" tag={RRNavLink} to="/">
                    Chuckle Bucket
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/categories">
                                        Categories
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/jokes/my">
                                        My Jokes
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/profile">
                                        My Profile
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <a
                                        aria-current="page"
                                        className="nav-link"
                                        style={{ cursor: "pointer" }}
                                        onClick={logout}
                                    >
                                        Logout
                                    </a>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
