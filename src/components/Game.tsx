import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { AppContext } from '../App';
import Introduction from './Introduction';

interface GameProps {
    updateClick: (click: number) => void;
    updateMaxClick: (click: number) => void;
    updateGameUp: (gameUp: boolean) => void;
    updateIntroductionUp: (introductionUp: boolean) => void;
    updatePlayableTime: (playableTime: number) => void;
}

const Game: React.FC<GameProps> = ({ updateClick, updateMaxClick, updateGameUp, updateIntroductionUp, updatePlayableTime }) => {
    const appProp = useContext(AppContext);
    const [disabled, setDisabled] = useState(false);
    const [disabledClick, setDisabledClick] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [count, setCount] = useState(appProp.playableTime);

    const timeOutGame = () => {
        new Promise<void>((resolve) => {
            setIsVisible(false);
            updateGameUp(true);

            setTimeout(() => {
                resolve()
            }, 4980);
        }).then(() => {
            setDisabled(false);
            updateGameUp(false);
            setDisabledClick(true);
            updatePlayableTime(5);
        }).catch((error) => {
            console.log("Timeout error:", error);
        });
    }

    const disableButton = () => {
        setDisabled(true);
        updateIntroductionUp(true);
        setIsVisible(true);

        new Promise<void>((resolve) => {
            setTimeout(() => {

                setDisabled(true);
                setDisabledClick(false);
                updateIntroductionUp(false);
                resolve();
            }, 2980);
        }).then(() => {
            updateGameUp(false);
            timeOutGame()
        }).catch((error) => {
            console.log("Timeout error:", error);
        });
    };

    const timerLeft = () => {
        const interval = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount === 1) {
                    clearInterval(interval);
                }
                return prevCount - 1;
            });
        }, 980);

        return () => clearInterval(interval);
    }

    useEffect(() => {
        if (!appProp.gameUp && appProp.currentClicks > appProp.maxClicks) {
            setCount(5);
            updateMaxClick(appProp.currentClicks);
            updateClick(0);
            console.log("maxClicks", appProp.playableTime);
        } else if (!appProp.gameUp && appProp.currentClicks <= appProp.maxClicks) {
            setCount(appProp.playableTime);
            updateClick(0);
        } else if (appProp.gameUp) {
            timerLeft()
        }
    }, [appProp.gameUp]);

    const updateCurrent = () => {
        const newClicks: number = appProp.currentClicks + 1;
        updateClick(newClicks);
    }

    return (
        <>
            <div className="flex justify-center mb-4">
                <Introduction isVisible={isVisible} />
            </div>
            <div className="flex justify-center">
                <div className="max-w-lg w-full bg-white p-4 rounded overflow-auto flex flex-col items-center">
                    <div className="space-y-5">
                        <span className="text-4xl">
                            Time Left: <br />
                            {count === 5 ? (
                                <span className="text-red-500 block animate-pulse">Press Start</span>
                            ) : (
                                <span className="text-blue-800 block animate-pulse">{count}</span>
                            )}
                        </span>
                        <br />
                        <span className="text-4xl">
                            Current Score: <br />
                            {appProp.currentClicks}
                        </span>
                        <br />
                    </div>
                    <h1 className="text-2xl mt-4">Max Score: {appProp.maxClicks}</h1>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button
                            size="medium"
                            variant="contained"
                            onClick={disableButton}
                            disabled={disabled}
                            className="w-full"
                        >
                            Start
                        </Button>
                        <Button
                            size="medium"
                            variant="contained"
                            color="secondary"
                            onClick={updateCurrent}
                            disabled={disabledClick}
                            className="w-full"
                        >
                            Click Now!
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Game