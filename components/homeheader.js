import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useEffect } from 'react'
import { useState } from 'react'
import NestedList from './list'

function HomeHeader() {
    const [scroll, setScroll] = useState(false);
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    }, []);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth <= 600) {
                setMobile(true);
            } else if (window.innerWidth >= 700) {
                setMobile(false);
            }
        });
    }, []);

    

    return (
        <>
            <header className='header'>
                <div className={mobile ? "nav__mobile" : 'navbar__nav'}>
                    <Navbar className={scroll ? "navbar__normal" : "navbar__top"} bg="dark" variant="dark">
                        <Navbar.Brand className='navbar__brand' href="#home">JoMoto Blog</Navbar.Brand>
                        <Nav >
                            <Nav.Link className='navbar__navitem' href="/">Home</Nav.Link>
                            <Nav.Link className='navbar__navitem' href="#features">About</Nav.Link>
                            <Nav.Link className='navbar__navitem' href="#footer">Contact Us</Nav.Link>
                        </Nav>
                    </Navbar>
                </div>
                <div className={!mobile ? "nav__mobile" : 'navbar__mobile'} >
                    <div className={scroll ? "navbar__mobile__normal" : "navbar__mobile__top"}>
                        <NestedList />
                    </div>
                </div>
            </header>

        </>

    )
}

export default HomeHeader