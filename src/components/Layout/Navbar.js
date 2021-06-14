/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { NavLink } from 'react-router-dom'

// Using navLink to navigate from one component to other 
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" exact to="/">
                    Agents
                </NavLink>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className= "nav-link active" exact to="/addAgent">
                               Add New Agent
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;