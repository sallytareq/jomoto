import { useState, useEffect } from 'react';

import Head from 'next/head';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import NestedList from './list';

export function windowSize(width) {
  // use passed width to determine when to change components
  let bool = null;
  if (window.innerWidth <= width) {
    bool = true;
  }
  if (window.innerWidth >= width + 1) {
    bool = false;
  }
  return bool;
}

function Header(props) {
  const [scroll, setScroll] = useState(false);
  const [mobile, setMobile] = useState(false);

  // to adjust header on scroll
  useEffect(() => { window.addEventListener('scroll', () => setScroll(window.scrollY > 50)); }, []);

  // Window size response
  useEffect(() => { setMobile(windowSize(725)); }, []);
  useEffect(() => { window.addEventListener('resize', () => setMobile(windowSize(725))); }, []);

  return (
    <>
      <Head>
        <title>JoMoto</title>
        <link rel="icon" href="/icon1.ico" />
      </Head>
      <header className={props.home ? 'header__home' : 'header'}>
        <div className={mobile ? 'nav__hidden' : 'navbar__nav'}>
          <Navbar className={props.home ? (scroll ? 'navbar__normal' : 'navbar__top') : 'navbar__normal'} variant={props.home ? (scroll ? 'dark' : 'light') : 'dark'}>
            <Navbar.Brand className="navbar__brand" href="/">JoMoto Blog</Navbar.Brand>
            <Nav>
              <Nav.Link className="navbar__navitem" href="/">Home</Nav.Link>
              <Nav.Link className="navbar__navitem" href="/posts">Posts</Nav.Link>
              <Nav.Link className="navbar__navitem" href="/gallery">Gallery</Nav.Link>
              <Nav.Link className="navbar__navitem" href="/about">About</Nav.Link>
            </Nav>
          </Navbar>
        </div>
        <div className={!mobile ? 'nav__hidden' : 'navbar__mobile'}>
          <div className={props.home ? (scroll ? 'navbar__normal' : 'navbar__top') : 'navbar__normal'}>
            <NestedList />
          </div>
        </div>
      </header>
    </>

  );
}

export default Header;
