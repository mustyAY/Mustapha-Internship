import React, { useEffect, useState } from "react";

function CountdownTimer({ expiryDate }) {

    const calculateRemainingTime = (expiryDate) => {
        const now = Date.now();
        const countdown = expiryDate - now;
        return Math.max(0, countdown);
    };

    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(expiryDate));

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newRemainingTime = calculateRemainingTime(expiryDate);
            setRemainingTime(newRemainingTime);

            if (newRemainingTime <= 0) {
                clearInterval(intervalId);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [expiryDate]);

    function formatTime(remainingTime) {
        const secondsLeft = remainingTime / 1000;
        const minutesLeft = secondsLeft / 60;
        const hoursLeft = minutesLeft / 24;

        const secondsText = Math.floor(secondsLeft % 60);
        const minutesText = Math.floor(minutesLeft % 60);
        const hoursText = Math.floor(hoursLeft);

        return `${hoursText}h ${minutesText}m ${secondsText}s`;
    }

    return (
        <>
            {
                remainingTime ?
                    <div className="de_countdown">{formatTime(remainingTime)}</div>
                    :
                    <div className="de_countdown">EXPIRED</div>
            }
        </>

    )
}

export default CountdownTimer;