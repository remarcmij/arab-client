import RotateRightRoundedIcon from '@material-ui/icons/RotateRightRounded';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';

type StringOrNumber = string | number;

interface IProps {
  userRelated?: boolean;
  restartTimer?: boolean;
  timer: string;
  onFinishCounting: (restartTimer: boolean) => void;
  icon?: ReactNode;
}

/**
 * stackoverflow: https://stackoverflow.com/questions/13601737/how-to-convert-milliseconds-into-a-readable-date-minutesseconds-format#answer-13603311
 * @param time number of millisecond style.
 */
const convertMillisecondToDigital = (time: number) => {
  let hours: StringOrNumber = Math.floor(time / 3600000);
  let minutes: StringOrNumber = Math.floor((time % 3600000) / 60000);
  let seconds: StringOrNumber = Math.floor(((time % 360000) % 60000) / 1000);

  hours = hours < 9 ? '0' + hours : hours;
  minutes = minutes < 9 ? '0' + minutes : minutes;
  seconds = seconds < 9 ? '0' + seconds : seconds;

  const total = hours + ':' + minutes + ':' + seconds;

  return total;
};

const defaults = {
  countDown: '00:02:00',
};

const Counter: React.FC<IProps> = ({
  restartTimer,
  timer,
  onFinishCounting,
  icon,
  children,
}) => {
  const [countDown, setCountDown] = useState<string>(timer);

  const [timerRunning, setTimerRunning] = useState(false);

  // setting up defaults
  const { defaultTimer } = useMemo(() => {
    if (typeof countDown === 'number') {
      const numberCountDown = convertMillisecondToDigital(countDown);
      setCountDown(numberCountDown);
    }
    return { defaultTimer: timer };
  }, [countDown, timer]);

  defaults.countDown = defaultTimer;

  useEffect(() => {
    if (!timerRunning) {
      return;
    }
    const intervalId: number = setInterval(() => {
      let [hours, minutes, seconds] = countDown.split(':').map(Number);

      const totalTime = hours * 60 + minutes * 60 + seconds;
      if (totalTime === 0) {
        setTimerRunning(false);
        setCountDown(defaults.countDown);
        onFinishCounting(true);
        return () => clearInterval(intervalId);
      }

      if (seconds === 0) {
        seconds = 60;
      }

      if (seconds > 0) {
        seconds -= 1;
      }

      if (seconds % 60 === 0) {
        minutes -= 1;
        if (hours > 0 && minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
      }

      const resSeconds = seconds > 9 ? seconds : '0' + seconds;
      const resMinutes = minutes > 9 ? minutes : '0' + minutes;
      const resHours = hours > 9 ? hours : '0' + hours;

      setCountDown(resHours + ':' + resMinutes + ':' + resSeconds);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countDown, timerRunning, onFinishCounting]);

  useEffect(() => {
    if (restartTimer) {
      setTimerRunning(true);
    }
  }, [restartTimer]);

  return (
    <>
      {!timerRunning ? (
        children
      ) : (
        <>
          {countDown}
          {icon || <RotateRightRoundedIcon />}
        </>
      )}
    </>
  );
};

export default Counter;
