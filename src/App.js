
import { useEffect, useState, useRef } from 'react'

function App() {
  const [pause, setPause] = useState(5);
  const [session, setSession] = useState(25)
  const [timeLeftDisp, setTimeLeftDisp] = useState('25:00')
  const [timeLeft, setTimeLeft] = useState(25)
  const [state, setState] = useState(0)
  const [secs, setSecs] = useState(0)
  const timerId = useRef()
  const [typeOfSession, setTypeOfSession] = useState('Session') 


  useEffect(()=>{
    if (state == 0) {
    setTimeLeft(session)
    setTimeLeftDisp(session + ':00')
  }}, [session])

  useEffect(()=>{
    if(state === 1) {
      timerId.current = setInterval(() => {
        setSecs(prev => prev - 1)
      }, 1000);
  } else {
    clearInterval(timerId.current)
  }
  return () => clearInterval(timerId.current)
}, [state])

useEffect(()=>{
  if (secs < 0 && state === 1) {
    if (timeLeft <= 0) {
      setSecs(0)
      if (typeOfSession == 'Session') {
        setTimeLeft(pause)
        setTypeOfSession('Pause')
      } else {
        setTimeLeft(session)
        setTypeOfSession('Session')
    } 
    document.getElementById('beep').play()
    } else {
      setTimeLeft(prev => prev - 1)
      setSecs(59)
    } 
  }
  console.log(secs)
}, [secs])

useEffect(()=>{
  setTimeLeftDisp(timeLeft.toString().padStart(2, '0') +':'+ secs.toString().padStart(2, '0'))
}, [timeLeft, secs])


  

  function handleStart_Stop() {
    if (state === 0) {
      setState(1)
    }
    else {
      setState(0)
    }

  }


  
  return (
    <>
      <div className='container'>
        <div className='counter'></div>
        <div className='clock' id='time-left'>{timeLeftDisp}</div>
        <div className='settings'>
          <div className='break'>
            <div id='break-label'>Break Length</div>
            <button onClick={()=>setPause(prev=> prev-1 > 0 ? prev-1 : 1 )} id='break-decrement'>⬇️</button>
            <button onClick={()=>setPause(prev => prev + 1 <=60 ? prev+1 : 60)} id='break-increment'>⬆️</button>
            <span id='break-length'>{pause}</span>
          </div>
          <div className='session'>
            <div id='session-label'>Session Length</div>
            <button onClick={()=>setSession(prev=> prev-1 > 0 ? prev-1 : 1 )} id='session-decrement'>⬇️</button>
            <button onClick={()=>setSession(prev => prev + 1 <=60 ? prev+1 : 60)} id='session-increment'>⬆️</button>
            <span id='session-length'>{session}</span>
          </div>
          <div id='timer-label'>{typeOfSession}</div>
            <button onClick={handleStart_Stop} id='start_stop'>⏯</button>
           <button id='reset' onClick={()=> {clearInterval(timerId.current);setState(0);setTypeOfSession('Session');setPause(5); setSession(25); setTimeLeft(25); setSecs(0);document.getElementById('beep').load()}}>🔁</button>
            <audio id='beep' src='http://alphapapa.net/startreksounds/TNG%20-%20Two%20Triple-Tone%20Alarm.wav'></audio>
        </div>
      </div>
    </>
  );
}

export default App;
