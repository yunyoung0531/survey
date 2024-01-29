import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

interface NavBarProps {
    title: string;
    description: string;
    userInputTitle: string;
}

const NavBar: React.FC<NavBarProps> = ({ title, description, userInputTitle }) => {
    let navigate = useNavigate();
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
            <Navbar.Brand className='ms-auto'>
                {/* <Link to="/preview"> */}
                <FontAwesomeIcon onClick={()=>{navigate('/preview' , { state: { title, description, userInputTitle } })}}icon={faEye} className='eye-icon' />
                {/* </Link> */}
            </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavBar;