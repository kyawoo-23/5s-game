import React from 'react';
import './Scoreboard.css'
import { useCollection } from '../hooks/useCollection';
import { useAuthContext } from '../hooks/useAuthContext'

export default function Scoreboard() {
  const { documents, error, isPending } = useCollection('users')
  const { user } = useAuthContext()

  return (
    <div className='scoreboard'>
      <div className='users-score users-score-title'>
        <p className='user-score-photo'>Profile</p>
        <p className='user-score-name'>Name</p>
        <p className='user-score-status'>Status</p>
        <p className='user-score-score'>Score</p>
      </div>
      {documents && documents.map(doc => (
        <div className='users-score' key={doc.id}>
          <img
           src={doc.photoURL} 
           referrerPolicy="no-referrer" 
           alt={`${doc.displayName}'s avatar`} 
           className={`userPhoto user-score-photo ${user.uid === doc.id ? 'active' : ''}`} 
          />
          <p className='user-score-name'>{doc.displayName}</p>
          <p className='user-score-status'>{doc.online ? 'online' : '-'}</p>
          <p className='user-score-score'>{doc.games.fiveSecondGame.score}</p>
        </div>
      ))}
      {isPending && 
        <div id="loading-bar-spinner" className="spinner">
          <div className="spinner-icon"></div>
        </div>
      }
      {!documents && !isPending && 
        <p className='error'>No documents found!</p>
      }
      {error && 
        <p className='error'>{error}</p>
      }
    </div>
  );
}
