import Axios from 'axios';

import {
  AUTH_TOKEN,
  CLIENT_ID,
  ADMIN_USERNAME
} from '../config';

const headers = {
  'Authorization': `Bearer ${AUTH_TOKEN}`,
  'Client-ID': CLIENT_ID
}

const API = Axios.create({
  baseURL: 'https://api.twitch.tv/helix/',
  timeout: 1000,
  headers,
});

export const getLeaderboard = async () => {
  const { data } = await API({
    url: '/bits/leaderboard',
    method: 'get'
  });


  data.data.map(async (user) => {
    const response = await getUser(user.user_id);
    const userProfile = response.data.data[0];
    user.userProfile = userProfile;
    return user;
  });
  return data;
}

export const getUserByUsername = async (username) => {
  return await API({
    url: '/users',
    params: {
      login: username
    },
  });
}

export const getPredictions = async () => {
  const { data } = await getUserByUsername(ADMIN_USERNAME);
  const broadcasterId = data.data[0].id;
  const predictions = await API({
    url: '/predictions',
    params: {
      broadcaster_id: broadcasterId
    }
  });
  const activePrediction = getActivePrediction(predictions.data.data);
  return activePrediction;
}

const getActivePrediction = (predictions) => {
  return predictions.filter((prediction) => {
    return prediction.status === 'ACTIVE';
  });
}

export const getUser = async (userId) => {
  return await API({
    url: '/users',
    params: {
      id: userId
    }
  });
}

export const getCheermotes = async () => {
  return await API({
    url: '/bits/cheermotes'
  });
}

export default API;