import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Scoreboard from './pages/Scoreboard';
import Navbar from './components/Navbar';

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route 
              path='/'
              element={user ? <Home /> : <Navigate replace to='/login' />}
            />
            <Route 
              path='/login'
              element={!user ? <Login /> : <Navigate replace to='/' />}
            />
            <Route 
              path='/scoreboard'
              element={user ? <Scoreboard /> : <Navigate replace to='/login' />}
            />
            <Route 
              path='/*'
              element={<Navigate replace to='/' />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
