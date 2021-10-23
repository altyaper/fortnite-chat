import { useState, useEffect } from 'react';
import 'animate.css';
import './App.css';
import icon from './icon_fortnite.png';
import {
  OAUTH_PASSWORD,
  ADMIN_USERNAME,
  FORTNITE_ID,
  DISCORD_LINK
} from './config';

import {
  Body,
  CommentWrapper,
  Username,
  Comment,
  Img,
  InfoWrapper
} from './components/styled/Chat'

const tmi = require('tmi.js');
const client = new tmi.Client({
	connection: {
		reconnect: true,
		secure: true
	},
  identity: {
    username: ADMIN_USERNAME,
    password: OAUTH_PASSWORD
  },
	channels: [ ADMIN_USERNAME ]
});
client.connect().catch(console.error);

const App = () => {

  const [ data, setData ] = useState({
    comments: [],
    users: {}
  });

  const say = (message) => {
    client.say(ADMIN_USERNAME, message);
  }

  const handleOnMessage = (_channel, tags, message, self) => {
    if(self) return;
    switch(message) {
      case '!discord':
        say(`Discord link: ${DISCORD_LINK}`);
        break;
      case '!id':
        say(`Fortnite ID: ${FORTNITE_ID}`);
        break;
      case '!setup':
        say(`
        Grafica: RTX 2081 SUPER 
        Memoria: 32GB RAM 
        Procesador: AMD Ryzen 7 3700X 
        Monitor: AOC Q27G2G4 144hz 
        Mouse: HyperX hx-mc002b 
        Camara: Sony A7II 
        Luz: Aputure AL-MX 
        `);
        break;
      default:
        updateComment(_channel, tags, message, self);
    }
  }

  const updateComment = (_channel, tags, message, self) => {
    const { username } = tags;
    data.comments.push({
      username: tags['display-name'],
      message
    });
    // If the user already exists in the object then we push the new comment
    if (data.users[username]) {
      data.users[username].comments.push(message);
    } else {
      // If the user is new, we just add the new comment
      data.users[username] = {
        userId: tags['user-id'],
        comments: [message]
      }
    }
    setData({ ...data });
  }

  useEffect(() => {
    client.on('message', handleOnMessage);
  }, []);
  
  return (
    <Body className="App">
      { data.comments && data.comments.map((c, idx) => {
        return (
          <CommentWrapper key={idx}>
            <Img src={icon} />
            <InfoWrapper>
              <Username>{c.username}</Username>
              <Comment>{c.message}</Comment>
            </InfoWrapper>
          </CommentWrapper>
        )
      })}
    </Body>
  );
}

export default App;
