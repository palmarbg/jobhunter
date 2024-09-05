import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserData } from '../redux/appSlice'


function Navbar() {
  const appData = useSelector(state => state.app)
  const dispatch = useDispatch()

  const isAuthenticated = appData.authState  !== 'foreign'

  const logoutUser = () => {
    dispatch(setUserData({}))
  }

  return (
    <nav>
      <ul>
        <li><Link to="">Főoldal</Link></li>
        {isAuthenticated && 
          <li><Link to="profile">Profil</Link></li>
        }
        {appData.authState === 'company' &&
          <li><Link to="jobs/create/new">Új hirdetés</Link></li>
        }
        { !isAuthenticated &&
          <>
            <li className='right'><Link to="login">Login</Link></li>
            <li className='right'><Link to="register">Register</Link></li>
          </>
        }
        { isAuthenticated &&
          <>
            <li className='right' onClick={logoutUser}><Link>Logout</Link></li>
          </>
        }
      </ul>
    </nav>
  )
}

export default Navbar