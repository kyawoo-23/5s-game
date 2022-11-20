import React from 'react';
import { useSignInWithGoogle } from '../hooks/useSignInWithGoogle';
import './Login.css'

export default function Login() {
  const { googleSignIn, error, isPending } = useSignInWithGoogle()

  return (
    <>
      <div className='title'>
        <p className='game-title'>5 seconds Game</p>
      </div>
      <div className='login-btn'>
        {!isPending && (
          <>
            <button 
              type="button" 
              className="login-with-google-btn" 
              onClick={() =>googleSignIn()} 
            >
              Sign in with Google
            </button>
          </>
        )}
        {isPending && (
          <>
            <button 
              type="button" 
              className="login-with-google-btn" 
              onClick={() =>googleSignIn()} 
              disabled
            >
              Loading user data
            </button>
            <div id="loading-bar-spinner" class="spinner">
              <div class="spinner-icon"></div>
            </div>
          </>
        )}
        {error && error !== "Firebase: Error (auth/popup-closed-by-user)." && 
          <p className='error'>{error}</p>
        }
      </div>
    </>
  )
}
