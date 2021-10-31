import React, { useState, useEffect } from 'react';
import ComponentCarousel from 'react-awesome-component-carousel';
import Axios from 'axios';
import {
  AUTH_TOKEN,
  CLIENT_ID
} from '../../config';

import gold from '../../gold.png';
import silver from '../../silver.png';
import copper from '../../copper.png';
import defaultRank from '../../default_rank.png';

import { 
  SupporterWrapper,
  CardWrapper
} from '../styled/Leaderboard';

const images = {
  rank1: gold,
  rank2: silver,
  rank3: copper,
  defaultRank,
}


const Leaderborad = () => {

  const [ leaderboard, setLeaderboard ] = useState({});

  const headers = {
    'Authorization': `Bearer ${AUTH_TOKEN}`,
    'Client-ID': CLIENT_ID
  }

  useEffect(async () => {
    const { data } = await Axios.get('https://api.twitch.tv/helix/bits/leaderboard', { headers })
    data.data.map(async (user) => {
      const response = await Axios.get(`https://api.twitch.tv/helix/users?id=${user.user_id}`, { headers })
      const userProfile = response.data.data[0];
      user.userProfile = userProfile;
      return user;
    });
    setLeaderboard(data);
  }, []);

  const SupporterCard = (donation) => () => {
    const rankImage = images[`rank${donation.rank}`] ? images[`rank${donation.rank}`] : images.defaultRank;
    return (
      <CardWrapper>
        <h1><img className='rank-image' src={rankImage} />{donation.user_name}</h1>
        <img className='profile-picture' src={donation.userProfile?.profile_image_url} />
      </CardWrapper>
    )
  };

  const components = leaderboard.data && leaderboard.data.map((donation) => SupporterCard(donation));

  return (
    <SupporterWrapper>
      {components && (
        <ComponentCarousel
          transition={'fade'}
          transitionDuration={0.3}
          auto
          disableButtons={true}
          autoDuration={10}
          coolOff={6}
          components={components}
        />
      )}
    </SupporterWrapper>
  )
}

export default Leaderborad;