import { useEffect, useState } from "react"
import "./Clock.css"

interface ClockProps {
    reciaveHours: number,
    reciaveMinutes: number,
    reciaveSeconds: number,
}

export default function Clock({reciaveHours, reciaveMinutes, reciaveSeconds}: ClockProps){

    //Use State e Use Effect para alteração dinâmica dos valores do relógio
    const [hours, setHours] = useState(reciaveHours);
    const [minutes, setMinutes] = useState(reciaveMinutes);
    const [seconds, setSeconds] = useState(reciaveSeconds);

    useEffect(() => {
        setHours(reciaveHours);
        setMinutes(reciaveMinutes);
        setSeconds(reciaveSeconds);
    }, [reciaveHours, reciaveMinutes, reciaveSeconds]);

    // Validação para valores menor que zero
    if (hours < 0) setHours(0);
    if (seconds < 0) setSeconds(0);
    if (minutes < 0) setMinutes(0);

    // Auto correção de valores
    if (seconds > 59) {
        setMinutes(minutes + Math.floor(seconds / 60));
        setSeconds(seconds % 60);
    }
    if (minutes > 59) {
        setHours(hours + Math.floor(minutes / 60));
        setMinutes(minutes % 60);
    }

    // useState para controlar as mudanças do cronômetro
    const [isRunning, setIsRunning] = useState(false);

    // useEffect para atualizar o crônometro 
    useEffect(() => {
        let interval: number;
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
    }, [seconds, minutes, hours, isRunning, reciaveHours, reciaveMinutes, reciaveSeconds])


    // Funções dos botões
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
                {hours !== 0 || minutes !== 0 || seconds !== 0 ? 
                (<p>{hours < 10 && "0"}{hours} : {minutes < 10 && "0"}{minutes} : {seconds < 10 && "0"}{seconds}</p>) :
                (<p>Acabou!</p>)    
            }
            </div>
            <button className="actions">
                {isRunning ? 
                (<span className="material-symbols-outlined" onClick={pauseTimer}>pause</span>) : 
                (<span className="material-symbols-outlined" onClick={startTimer} >resume</span>)}
            </button>
        </div>
    )
}