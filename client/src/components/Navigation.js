// import React from 'react'
import { NavLink } from 'react-router-dom'

import './Navigation.css'

import { Navbar, Nav } from 'react-bootstrap/'

import { AiOutlineStock } from 'react-icons/ai'

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand='lg' id='navbar-menu'>
      {/* <Navbar.Brand className='nav-title' href='/' style={{ color: '#f8f8ff' }}> */}
      <Navbar.Brand className='nav-title' href='/'>
        <span className='nav-logo'><AiOutlineStock /> </span>
        StoX
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' id='hamburger' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav
          activeKey={window.location.pathname}
          className='mr-auto' id='nav-links'
          style={{ color: '#f8f8ff' }}
        >
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/portfolio'>Portfolio</Nav.Link>
          <Nav.Link href='/report'>Report</Nav.Link>
          <Nav.Link href='/login'>Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
