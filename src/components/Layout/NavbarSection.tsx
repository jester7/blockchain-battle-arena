import { COLORS, FONTS } from '../../styles'
import { ImGithub } from 'react-icons/im'
import { Link, useLocation } from 'react-router-dom'
import { SectionContainer } from '../shared/SectionContainer'
import OpenSea from '../../icons/icon-opensea.png'
import styled from 'styled-components'

const Navbar = styled(SectionContainer)`
  flex-direction: row;
  justify-content: space-evenly;
  padding: 1.7rem;
`

const OpenSeaIcon = styled.div`
  display: inline-block;
  background-image: url(${OpenSea});
  background-size: contain;
  background-repeat: no-repeat;
  width: 1.75em;
  height: 1.75em;
`

const Github = styled(ImGithub)`
  color: white;
  font-size: 1.6em;
`

interface INavItem {
  text: string
  path: string
}

const NavItemLink = styled((props) => <Link {...props} />)`
  font-family: ${FONTS.primary};
  font-size: 1.5rem;
  text-decoration: none;
  color: ${(props) => (props.selected ? COLORS.redPink : COLORS.blueLight)};
  &:hover {
    color: ${COLORS.highlight};
    text-shadow: 5px 5px 5px ${COLORS.greyDarkAlpha};
  }
`

const NavItem = ({ text, path }: INavItem) => {
  const { pathname } = useLocation()
  const selected =
    pathname.toLowerCase() === path.toLowerCase() &&
    pathname.toLowerCase() !== '/'
  return (
    <NavItemLink to={path} selected={selected}>
      {text}
    </NavItemLink>
  )
}

const OpenSeaLink = () => {
  return (
    <a href='https://testnets.opensea.io/collection/blockchain-battle-arena-v2'>
      <OpenSeaIcon />
    </a>
  )
}

const GithubLink = () => {
  return (
    <a href='https://github.com/jester7/blockchain-battle-arena'>
      <Github />
    </a>
  )
}

export const NavbarSection = () => {
  return (
    <Navbar>
      <NavItem text='Home' path='/' />
      <NavItem text='Mint' path='/mint' />
      <NavItem text='Launch Game' path='/launch-game' />
      <NavItem text='About' path='/about' />
      <GithubLink />
      <OpenSeaLink />
    </Navbar>
  )
}
