import React from "react";
import logo from "../logo2.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const Logout = async () => {
        try {
            await axios.delete("http://localhost:5000/logout");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src={logo} width="112" height="28" alt="gambar" />
                    </a>

                    <a
                        role="button"
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        href="/">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="/" className="navbar-item">
                            Home
                        </a>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button onClick={Logout} className="button is-light">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
