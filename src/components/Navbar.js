import { NavLink } from 'react-router-dom';
import { auth } from '../firebase/config'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
    <>
      {user && (
        <nav className='navbar'>
          <div className='userTitle'>
            <img referrerPolicy="no-referrer" src={user.photoURL} alt='user photo' className='userPhoto' />
            <p>{user.displayName}</p>
          </div>
          <div>
            <NavLink to='/'>
              Home
            </NavLink>
            <NavLink to='/scoreboard'>
              Scoreboard
            </NavLink>
            <NavLink to='/login' onClick={logout}>
              {!isPending && 'Logout'}
              {isPending && 'Logging out'}
            </NavLink>
          </div>
        </nav>
      )}
    </>
  );
}
