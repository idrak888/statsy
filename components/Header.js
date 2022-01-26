import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Image from 'next/image';
import logo from '/public/assets/logo.png';
import logo_white from '/public/assets/logo_white.png';
import styles from '/styles/Header/Header.module.css';

export default function Header(props) {
	const [darkMode, setDarkMode] = useState(false);
    
	useEffect(() => {
		setDarkMode(JSON.parse(sessionStorage.getItem("dark_mode")));
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        props.darkModeToggle();
        sessionStorage.setItem("dark_mode", !darkMode);
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"}>
            <Container>
                <Navbar.Brand onClick={() => {
                    window.location = "/";
                }} href="/" style={{marginTop: 5}}><Image width={120} height={38.4} src={darkMode ? logo_white : logo}/></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/info" style={darkMode ? { color: "white" } : {}} className={styles.link}>API Information</Nav.Link>
                </Nav>
                <Nav>
                    <div className={styles.switchWrapper}>
                        <img width="30" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/118/sun-with-face_1f31e.png"/>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode}/>
                            <span className={`${styles.slider} ${styles.round}`}></span>
                        </label>
                        <img width="30" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/apple/285/crescent-moon_1f319.png"/>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    )
}
