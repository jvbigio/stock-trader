// import React from 'react'
import { NavLink } from 'react-router-dom'

import './Navigation.css'

import { Navbar, Nav } from 'react-bootstrap/'

// import { AiOutlineStock } from 'react-icons/ai'

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand='lg' id='navbar-menu'>
      <Navbar.Brand className='nav-title' href='/'>
        StoX
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' id='hamburger' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav
          activeKey={window.location.pathname}
          className='mr-auto' id='nav-links'
          style={{ color: '#f8f8ff' }}
        >
          <Nav.Link className='nav-item' href='/'>Home</Nav.Link>
          <Nav.Link className='nav-item' href='/portfolio'>Portfolio</Nav.Link>
          <Nav.Link className='nav-item' href='/report'>Report</Nav.Link>
          <Nav.Link className='nav-item' href='/about'>About</Nav.Link>
          <Nav.Link className='nav-item' href='/login' id='login-link'>Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
