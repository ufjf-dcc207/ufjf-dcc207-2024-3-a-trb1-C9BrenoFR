import { useEffect, useState } from "react"
import "./Clock.css"

interface ClockProps {
    reciaveHours: number,
    reciaveMinutes: number,
    reciaveSeconds: number,
}

export default function Clock({reciaveHours, reciaveMinutes, reciaveSeconds}: ClockProps){
    if(reciaveHours < 0)
        reciaveHours = 0;
    if(reciaveMinutes < 0)
        reciaveMinutes = 0;
    else if (reciaveMinutes > 59)
        reciaveMinutes = 59
    if(reciaveSeconds < 0)
        reciaveSeconds = 0;
    else if (reciaveSeconds > 59)
        reciaveSeconds = 59

    const [hours, setHours] = useState(reciaveHours);
    const [minutes, setMinutes] = useState(reciaveMinutes);
    const [seconds, setSeconds] = useState(reciaveSeconds);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if(isRunning){
            interval = setInterval(() => {
                if(seconds > 0){
                    setSeconds((seconds) => seconds - 1);
                }else if(minutes > 0){
                    setMinutes((minutes) => minutes - 1);
                    setSeconds(59);
                }else if(hours > 0){
                    setHours((hours) => hours - 1);
                    setMinutes(59);
                    setSeconds(59);
                }else{
                    setIsRunning(false);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [seconds, minutes, hours, isRunning])

    function startTimer() {
        if(hours !== 0 || minutes !== 0 || seconds !== 0){
            setIsRunning(true);
        }
    }

    function pauseTimer() {
        setIsRunning(false);
    }

    return (
        <div className="clock">
            <div className="clock-display">
                <p>
                    {hours + " : " + minutes + " : " + seconds}
                </p>
            </div>
            <button className="actions">
                {isRunning ? 
                (<span className="material-symbols-outlined" onClick={pauseTimer}>pause</span>) : 
                (<span className="material-symbols-outlined" onClick={startTimer} >resume</span>)}
            </button>
        </div>
    )
}