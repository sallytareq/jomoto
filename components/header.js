import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useEffect } from 'react'
import { useState } from 'react'
import NestedList from './list'
import Head from 'next/head'

function windowSize() {
    if (window.innerWidth <= 625) {
        return true
    } else if (window.innerWidth >= 700) {
        return false
    }
}

function Header(props) {

    const [scroll, setScroll] = useState(false);
    const [mobile, setMobile] = useState(false);

    useEffect(() => { window.addEventListener("scroll", () => setScroll(window.scrollY > 50)) }, []);

    useEffect(() => { setMobile(windowSize()) }, []);
    useEffect(() => { window.addEventListener("resize", () => setMobile(windowSize())) }, []);

    return (
        <>
            <Head>
                <title>JoMoto</title>
                <link rel="icon" href="/icon1.ico" />
            </Head>
            <header className={props.home ? 'header__home' : 'header'}>
                <div className={mobile ? "nav__hidden" : 'navbar__nav'}>
                    <Navbar className={props.home ? (scroll ? "navbar__normal" : "navbar__top") : "navbar__normal"} variant={props.home? (scroll ? "dark" : "light"):"dark"}>
                        <Navbar.Brand className='navbar__brand' href="#home">JoMoto Blog</Navbar.Brand>
                        <Nav >
                            <Nav.Link className='navbar__navitem' href="/">Home</Nav.Link>
                            <Nav.Link className='navbar__navitem' href="/posts">Posts</Nav.Link>
                            <Nav.Link className='navbar__navitem' href="/about">About</Nav.Link>
                            <Nav.Link className='navbar__navitem' href="#footer">Contact Us</Nav.Link>
                        </Nav>
                    </Navbar>
                </div>
                <div className={!mobile ? "nav__hidden" : 'navbar__mobile'} >
                    <div className={props.home ? (scroll ? "navbar__normal" : "navbar__top") : "navbar__normal"}>
                        <NestedList />
                    </div>
                </div>
            </header>
        </>

    )
}

export default Header