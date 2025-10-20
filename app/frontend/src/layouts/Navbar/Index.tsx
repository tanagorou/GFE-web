import { Link } from "react-router-dom"
import './Navbar.css'
import DehazeIcon from '@mui/icons-material/Dehaze';
import { useState } from "react"
import { styled } from '@mui/material/styles';
import { useSidebarOpen } from "../../context/SidebarContext";

const NavbarContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  minHeight: '8%',
  width: '100%',
  backgroundColor: '#0D405A',
  padding: '0 16px',
})

const LogoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
})

const LogoIcon = styled('button')({
  display: 'grid',
  placeItems: 'center',
  background: 'none',
  border: 'none',
})

const LogoText = styled('h4')({
  color: 'white',
  fontSize: 'clamp(18px, 2vw, 22px)',
  fontWeight: 750,
})

const NavLinks = styled('ul')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '16px',
  listStyle: 'none',
})

const NavLink = styled('li')({
  listStyle: 'none',
})

const NavLinkText = styled(Link)({
  textDecoration: 'none',
  color: 'white',
  fontWeight: 750,
})

export const Navbar = () => {
  const {sidebarOpen,setSidebarOpen} = useSidebarOpen()

  const handle = () => {
    setSidebarOpen(!sidebarOpen)
    console.log(sidebarOpen)
  }

  return (
    <NavbarContainer className="nav">
      <LogoContainer>
        <LogoIcon onClick={() => handle()}>
          <DehazeIcon style={{ color: 'white' }}/>
        </LogoIcon>
        <LogoText>GFE-web</LogoText>
      </LogoContainer>
      <NavLinks>
        <NavLink><NavLinkText to='/'>Home</NavLinkText></NavLink>
        <NavLink><NavLinkText to='/study'>Study</NavLinkText></NavLink>
        <NavLink><NavLinkText to='/signin'>Login</NavLinkText></NavLink>
        <NavLink><NavLinkText to='/logout'>Logout</NavLinkText></NavLink>
        <NavLink><NavLinkText to='/profile'>Profile</NavLinkText></NavLink>
      </NavLinks>
    </NavbarContainer>
  )
}