// import React from 'react'
import { NavLink } from 'react-router-dom'

import './Navigation.css'

import { Navbar, Nav } from 'react-bootstrap/'

import { AiOutlineStock } from 'react-icons/ai'

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand='lg' id='navbar-menu'>
      <Navbar.Brand
        href='/'
        style={{ color: '#f8f8ff' }}
      >
        <span><AiOutlineStock /> </span>
        Stock Trader
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' id='hamburger' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto' id='nav-links' style={{ color: '#f8f8ff' }}>
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/summary'>Summary</Nav.Link>
          <Nav.Link href='/report'>Report</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
