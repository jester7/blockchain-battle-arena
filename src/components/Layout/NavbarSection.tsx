import { COLORS } from '../../styles'
import { ImGithub } from 'react-icons/im'
import { Link, useLocation } from 'react-router-dom'
import OpenSea from '../../icons/icon-opensea.png'
import styled from 'styled-components'

const NavBar = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 1rem 0;
  padding: 1.6em;
  background-color: ${COLORS.greyDarkAlpha};
  flex-flow: row;
  border-radius: 2em;
  box-shadow: 0px 0px 8px ${COLORS.blueLightAlpha};
  justify-content: space-evenly;
  align-items: center;
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
  font-size: 1.2em;
  color: ${(props) => (props.selected ? COLORS.redPink : COLORS.blueLight)};
  &:hover {
    color: #fff;
    text-shadow: 0px 0px 4px rgba(95, 222, 245, 0.8);
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
    <NavBar>
      <NavItem text='Home' path='/' />
      <NavItem text='Mint' path='/mint' />
      <NavItem text='Launch Game' path='/launch-game' />
      <NavItem text='About' path='/about' />
      <GithubLink />
      <OpenSeaLink />
    </NavBar>
  )
}
