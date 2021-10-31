import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Homepage = () => {
  return (
    <div>
      <Link to='/chat'>
        <Button>Chat</Button>
      </Link>
      <Link to='/leaderboard'>
        <Button>Leaderboard</Button> 
      </Link>
    </div>
  )
}

export default Homepage;