import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useEffect } from 'react'
import { useState } from 'react'
import NestedList from './list'

function Header() {
    const [mobile, setMobile] = useState(false);

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
            <div className={mobile ? "nav__mobile" : 'navbar__nav'}>
                <Navbar className="navbar__normal" bg="dark" variant="dark">
                    <Navbar.Brand className='navbar__brand' href="/">JoMoto Blog</Navbar.Brand>
                    <Nav >
                        <Nav.Link className='navbar__navitem' href="/">Home</Nav.Link>
                        <Nav.Link className='navbar__navitem' href="#features">About</Nav.Link>
                        <Nav.Link className='navbar__navitem' href="#footer">Contact Us</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
            <div className={!mobile ? "nav__mobile" : 'navbar__mobile__normal'}>
                <NestedList />
            </div>
        </>

    )
}

export default Header