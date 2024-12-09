import { useEffect, useState } from "react"
import "./Clock.css"

interface ClockProps {
    reciaveHours: number,
    reciaveMinutes: number,
    reciaveSeconds: number,
}

export default function Clock({reciaveHours, reciaveMinutes, reciaveSeconds}: ClockProps){
    const [hours, setHours] = useState(reciaveHours);
    const [minutes, setMinutes] = useState(reciaveMinutes);
    const [seconds, setSeconds] = useState(reciaveSeconds);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if(isRunning){
            setInterval(() => {
                if(seconds > 0){
                    setSeconds((seconds) => seconds - 1);
                }else if(minutes > 0){
                    setMinutes((minutes) => minutes - 1);
                    setSeconds(59);
                }else if(hours > 0){
                    setHours((hours) => hours - 1);
                    setMinutes(59);
                    setSeconds(59);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [seconds, minutes, hours, isRunning])

    function startTimer() {
        if(hours !== 0 || minutes !== 0 || seconds !== 0){
            setIsRunning(true);
            console.log(isRunning)
        }
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
                (<span className="material-symbols-outlined">pause</span>) : 
                (<span className="material-symbols-outlined" onClick={startTimer} >resume</span>)}
            </button>
        </div>
    )
}