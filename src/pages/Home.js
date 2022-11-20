import React, { useEffect } from 'react';
import { useState } from 'react';
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext'
import styles from './Home.module.css'

export default function Home() {
  const [count, setCount] = useState(0)
  const [clearCount, setClearCount] = useState(null)
  const [result, setResult] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isHighscore, setIsHighscore] = useState(false)
  const { user } = useAuthContext()

  const startCount = (e) => {
    e.preventDefault()
    let startTime = new Date()
    let clear = setInterval(() => {
      setCount((new Date() - startTime)/1000)
    }, 1)
    setClearCount(clear)
    setResult(0)
    setIsPlaying(true)
    setIsGameOver(false)
    setIsHighscore(false)
  }

  const stopCount = (e) => {
    e.preventDefault()
    clearInterval(clearCount)
    setResult(count)
    setCount(0)
    setIsPlaying(false)
  }

  useEffect(() => {
    const userRef = doc(db, "users", user.uid)
    if (result !== 0) {
      if (result > 5) {
        setIsGameOver(true)
        return
      }
      const addScore = async () => {
        await updateDoc(userRef, {
          games: {
            fiveSecondGame: {
              score: result
            }
          }
        });
      }
      getDoc(userRef).then(docSnap => {
        if (result > docSnap.data().games.fiveSecondGame.score) {
          addScore()
          setIsHighscore(true)
        }
      })
    }
  }, [result])

  return (
    <div className="Home">
      <h2 className={styles['title']}>5 seconds Game</h2>
      <p 
        className={[styles['count'], count !== 0 ? styles['fade-out'] : ''].join(' ')}
      >
        {count}
      </p>
      <br />
      {!isPlaying && <button className={styles['btn']} onClick={startCount}>Start</button>}
      {isPlaying && <button className={styles['btn']} onClick={stopCount}>Stop</button>}
      {result !== 0 && !isGameOver &&
        <>
          <p className={styles['show-result']}>
            Your result is <b>{result}</b>s
          </p>
          {isHighscore && <p className={styles['show-result']}><u>HIGHSCORE!</u></p>}
        </>
      }
      {result !== 0 && isGameOver &&
        <p className={styles['show-result']}>You went over 5s &#58;&#40;</p>
      }
      {result !== 0 && !isGameOver && result === 5 &&
        <p className={styles['perfect']}>Perfect! You stopped at exactly 5s!</p>
      }
    </div>
  );
}
