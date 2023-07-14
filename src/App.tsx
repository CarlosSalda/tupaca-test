import { useState, createContext } from 'react'
import './App.css'
import Game from './components/Game'

interface AppProps {
  currentClicks: number;
  maxClicks: number;
  gameUp: boolean;
  introductionUp: boolean;
  playableTime: number;
}

export const AppContext = createContext<AppProps>({
  currentClicks: 0,
  maxClicks: 0,
  gameUp: false,
  introductionUp: false,
  playableTime: 5,
});

function App() {
  const [clicks, setClicks] = useState(0)
  const [maxClicks, setMaxClicks] = useState(0)
  const [gameUp, setGameUp] = useState(false)
  const [introductionUp, setIntroductionUp] = useState(false)
  const [playableTime, setPlayableTime] = useState(5)

  const updateClick = (click: number) => {
    console.log(click, "app");
    setClicks(click);
  }

  const updateMaxClick = (click: number) => {
    setMaxClicks(click);
  }

  const updateGameUp = (gameUp: boolean) => {
    setGameUp(gameUp);
  }

  const updateIntroductionUp = (introductionUp: boolean) => {
    setIntroductionUp(introductionUp);
  }

  const updatePlayableTime = (playableTime: number) => {
    setPlayableTime(playableTime);
  }

  return (
    <>
      <AppContext.Provider value={{
        currentClicks: clicks,
        maxClicks: maxClicks,
        gameUp: gameUp,
        introductionUp: introductionUp,
        playableTime: playableTime
      }}>

        <Game updateClick={updateClick}
          updateMaxClick={updateMaxClick}
          updateGameUp={updateGameUp}
          updateIntroductionUp={updateIntroductionUp}
          updatePlayableTime={updatePlayableTime} />

      </AppContext.Provider>
    </>
  )
}

export default App
