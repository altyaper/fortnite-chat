import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import iconNotification from '../../notification.png';
import { getPredictions } from '../../api';

const rotate = keyframes`
  0% {
    transform: translateX(-100%);
  }

  10% {
    transform: translateX(0%);
  }

  90% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-100%);
  }
`;

const PredictionWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  text-align: center;
  width: 100%;
`


const PredictionTitle = styled.h1`
  text-transform: uppercase;
  font-size: 40px;
  color: #046688;
  margin-bottom: 10px;
  font-weight: bold;
`

const Square = styled.div`
  background-color: #1A213B;
  padding: 20px;
  display: flex;
  align-items: center;
`
const PredictionsWrapper = styled.div`
  display: flex;
  animation: ${rotate} 20s cubic-bezier(.11,.16,.66,.94) forwards;
`

const OutcomeAnswers = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  justify-content: center;
  
  li {
    padding: 0px 20px;
    font-size: 40px;
    font-weight: bold;
    background-color: #34BAFF;
    color: white;
    margin: 0 10px;
  }
`

const Predictions = () => {
  const [predictions, setPredictions] = useState([]);
  useEffect(() => {
    getPredictions().then((predictions) => {
      setPredictions(predictions);
    });
  }, []);
  return (
    <PredictionsWrapper>
      {predictions && predictions.length && (
        <Square>
          <img src={iconNotification} alt='notification' />
        </Square>
      )}
      {predictions && predictions.map((prediction) => {
        return (
          <PredictionWrapper>
            <PredictionTitle>{prediction.title}</PredictionTitle>
            <OutcomeAnswers>
              {prediction.outcomes.map((answer) => {
                return (
                  <li>
                    <p>{answer.title}</p>
                  </li>
                )
              })}
            </OutcomeAnswers>
          </PredictionWrapper>
        )
      })}
    </PredictionsWrapper>
  )
}

export default Predictions;