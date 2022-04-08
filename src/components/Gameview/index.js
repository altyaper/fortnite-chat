import React, { useRef, useEffect, useState } from 'react';
import Game from '../../lib/rivals/game';
import styled from 'styled-components';
import Client from '../Chatview/client';

const Canvas = styled.canvas`
  position: relative;
`

const Score = styled.div`
  color: #fff;
  top: 0;
  left: 0;
  font-size: 50px;
  user-select: none;
  padding: 20px;
  position: absolute;
`

const Gameview = () => {
  const canvasRef = useRef(null);
  const [game, setGame] = useState();
  
  useEffect(() => {
    const g = new Game(canvasRef.current);
    setGame(g);
  }, [canvasRef])

  useEffect(() => {
    if (game) {
      game.init();
      Client.on('message', handleOnMessage);
    }
  }, [game]);

  const handleOnMessage = (...response) => {
    const [ _channel, tags, message, self ] = response;
    if (self) return;
    const isCommand = message.startsWith('!');
    if (isCommand && game) {
      game.addEnemy();
    }
  }

  return (
    <div>
      <Canvas id="game-canvas" ref={canvasRef}></Canvas>
      <Score>
        <span>Score: </span>
        <span id="scoreEl">0</span>
      </Score>
    </div>
  );
}

export default Gameview;