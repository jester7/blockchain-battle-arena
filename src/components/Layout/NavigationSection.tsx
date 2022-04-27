import { Link } from 'react-router-dom'

export default function NavigationSection() {
  return (
    <>
      <ul className='navbar section'>
        <li>
          <Link className='button' to='/'>
            Home
          </Link>
        </li>
        {/* <Link className="button" to="/me">My Profile</Link> */}
        <li>
          <Link className='button' to='/mint'>
            Mint
          </Link>
        </li>
        <li>
          <Link className='button' to='/launch-game'>
            Launch Game
          </Link>
        </li>
        <li>
          <Link className='button' to='/about'>
            About
          </Link>
        </li>

        <li>
          <a
            href='https://github.com/jester7/blockchain-battle-arena'
            className='icon github'
          >
            {' '}
          </a>
        </li>
        <li>
          <a
            href='https://testnets.opensea.io/collection/blockchain-battle-arena-v2'
            className='icon opensea'
          >
            {' '}
          </a>
        </li>
      </ul>
    </>
  )
}
