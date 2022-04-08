import React, { useState, useEffect } from 'react';
import ComponentCarousel from 'react-awesome-component-carousel';

import gold from '../../gold.png';
import silver from '../../silver.png';
import copper from '../../copper.png';
import defaultRank from '../../default_rank.png';

import { 
  SupporterWrapper,
  CardWrapper
} from '../styled/Leaderboard';
import { getLeaderboard } from '../../api';

const images = {
  rank1: gold,
  rank2: silver,
  rank3: copper,
  defaultRank,
}

const Leaderborad = () => {

  const [ leaderboard, setLeaderboard ] = useState({});
  
  useEffect(() => {
    getLeaderboard().then(x => {
      setLeaderboard(x);
    });
  }, []);

  const SupporterCard = (donation) => () => {
    const rankImage = images[`rank${donation.rank}`] ? images[`rank${donation.rank}`] : images.defaultRank;
    return (
      <CardWrapper>
        <h1><img alt='rank' className='rank-image' src={rankImage} />{donation.user_name}</h1>
        <img alt='profile' className='profile-picture' src={donation.userProfile?.profile_image_url} />
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