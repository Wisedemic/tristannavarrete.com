import React, { useState } from 'react';
import Link from 'next/link';

function Header() {
    const [isMenuToggled, setMenu] = useState(false);
    const disableMenu = () => setMenu(false);
    const enableMenu = () => setMenu(true);

    const isActive = isMenuToggled ? ' is-active' : '';

    return (
        <nav className="navbar" id="mainNav" role="navigation" aria-label="main navigation" onBlur={disableMenu}>
            <div className="navbar-brand">
                <Link href="/">
                    <a className="navbar-item" onClick={disableMenu}>
                        <p className="title is-6">
                            Tristan Navarrete
                            <h2 className="subtitle is-6">Software Developer</h2>
                        </p>
                    </a>
                </Link>
                <a role="button" className={`navbar-burger${isActive}`} onClick={isMenuToggled ? disableMenu : enableMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
            <div className={`navbar-menu${isActive}`}>
                <div className="navbar-start">

                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a href="https://github.com/wisedemic/" target="_blank" className="button is-dark has-icon">
                                <span>Github</span>
                                <span className="icon"><i className="fab fa-github"></i></span>
                            </a>
                            <a href="https://medium.com/@navarrete.tristan/" target="_blank" className="button is-success has-icon">
                                <span>Medium</span>
                                <span className="icon"><i className="fab fa-medium-m"></i></span>
                            </a>
                            <a href="https://twitter.com/TristanPreaches/" target="_blank" className="button is-info has-icon">
                                <span>Twitter</span>
                                <span className="icon"><i className="fab fa-twitter"></i></span>
                            </a>
                            <a href="mailto:navarrete.tristan@gmail.com" className="button is-light has-icon">
                                <span>Email</span>
                                <span className="icon"><i className="fas fa-envelope"></i></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    );
}

export default Header;