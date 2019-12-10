import React, { useState, useEffect, useMemo, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import RotateRightRoundedIcon from '@material-ui/icons/RotateRightRounded';

type StringOrNumber = string | number;

interface IProps {
  userRelated?: boolean;
  restartTimer?: boolean;
  timer: string;
  onFinishCounting: (restartTimer: boolean) => void;
  icon?: ReactNode;
}

/**
 *
 * @param time string of `00:00:00` style.
 */
const convertDigitalToMillisecond = (time: string) => {
  const countDown = time;
  let [hours, minutes, seconds] = countDown.split(':').map(Number);

  hours = hours * 1000 * 60 * 60;
  minutes = minutes * 1000 * 60;
  seconds = seconds * 1000;

  const total = hours + minutes + seconds;

  return total;
};

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
  userRelated,
  restartTimer,
  timer,
  onFinishCounting,
  icon,
  children,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [countDown, setCountDown] = useState<string>(timer);

  const [timerRunning, setTimerRunning] = useState(false);

  // setting up defaults
  useMemo(() => {
    defaults.countDown = timer;
    if (typeof countDown === 'number') {
      const numberCountDown = convertMillisecondToDigital(countDown);
      setCountDown(numberCountDown);
    }
  }, [countDown, timer]);

  useEffect(() => {
    if (countDown !== defaults.countDown) {
      return;
    }

    if (user && userRelated) {
      const countDownInMilliseconds = convertDigitalToMillisecond(countDown);

      const diffUserCreationFromNow = Date.now() - Date.parse(user.created);

      // an auto run for new registered users.
      const isUserRegistrationTooOld =
        countDownInMilliseconds < diffUserCreationFromNow;
      if (isUserRegistrationTooOld) {
        return;
      }

      const diffUserRemainingTimer =
        countDownInMilliseconds - diffUserCreationFromNow;

      const digitalRemainingTimer = convertMillisecondToDigital(
        diffUserRemainingTimer,
      );

      setTimerRunning(true);
      setCountDown(digitalRemainingTimer);
    }
  }, [user, userRelated, countDown]);

  useEffect(() => {
    if (!timerRunning) {
      return;
    }
    const intervalId: number = setInterval(() => {
      // todo: counting the hours part.
      let [, minutes, seconds] = countDown.split(':').map(Number);
      const totalTime = minutes * 60 + seconds;
      if (totalTime === 0) {
        setTimerRunning(false);
        setCountDown(defaults.countDown);
        onFinishCounting(true);
        return () => clearInterval(intervalId);
      }

      const prevMinutes = minutes;
      minutes = seconds === 0 ? minutes - 1 : minutes;
      seconds = minutes === prevMinutes - 1 ? 59 : seconds - 1;

      const resSeconds = seconds > 9 ? seconds : '0' + seconds;
      const resMinutes = minutes > 9 ? minutes : '0' + minutes;

      setCountDown('00:' + resMinutes + ':' + resSeconds);
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
