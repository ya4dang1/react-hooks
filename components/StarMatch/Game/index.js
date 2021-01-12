import { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import mathUtil from '../../../static/utils/math';
import PlayAgain from './PlayAgain';
import PlayNumber from './PlayNumber';
import StarDisplay from './StarDisplay';

const useGameState = () => {
  const [stars, setStars] = useState(mathUtil.random(1, 9));
  const [availableNums, setAvailableNums] = useState(
    mathUtil.range(1, 9),
  );
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    let timerId;
    if (secondsLeft > 0 && availableNums.length > 0) {
      timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  });

  const setGameState = (newCandidateNums) => {
    if (mathUtil.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        (n) => !newCandidateNums.includes(n),
      );
      setStars(mathUtil.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  const resetGame = () => {
    setTimeout(() => {
      setStars(mathUtil.random(1, 9));
      setAvailableNums(mathUtil.range(1, 9));
      setCandidateNums([]);
      setSecondsLeft(10);
    }, 300);
  };

  return {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
    resetGame,
  };
};

const Game = () => {
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
    resetGame,
  } = useGameState();

  const gameStatus = (() => {
    if (availableNums.length === 0) return 'won';
    return secondsLeft === 0 ? 'lost' : 'active';
  })();

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }

    if (candidateNums.includes(number)) {
      const candidatesAreWrong = mathUtil.sum(candidateNums) > stars;
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === 'used' || secondsLeft === 0) return;

    const newCandidateNums =
      currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter((cn) => cn !== number);

    setGameState(newCandidateNums);
  };

  return (
    <>
      <Grid container className="game">
        <Grid item xs={12}>
          <Alert severity="info" className="help">
            Pick 1 or more number that sum to the number of stars
          </Alert>
        </Grid>
        <Grid item xs={6} align="center">
          {gameStatus !== 'active' ? (
            <PlayAgain onClick={resetGame} gameStatus={gameStatus} />
          ) : (
            <StarDisplay count={stars} />
          )}
        </Grid>
        <Grid item xs={6} align="center">
          {mathUtil.range(1, 9).map((number) => (
            <PlayNumber
              key={number}
              number={number}
              status={numberStatus(number)}
              onClick={onNumberClick}
            />
          ))}
        </Grid>
        <Grid item xs align="center">
          <Typography variant="h5" className="timer">
            Time Remaining: {secondsLeft}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Game;
