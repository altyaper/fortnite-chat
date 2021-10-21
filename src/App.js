import { useState } from 'react';
import styled from 'styled-components';
import 'animate.css';
import './App.css';
import icon from './icon_fortnite.png';

const tmi = require('tmi.js');
const client = new tmi.Client({
	connection: {
		reconnect: true,
		secure: true
	},
	channels: [ 'altyaper' ]
});
client.connect().catch(console.error);

const Body = styled.div`
  padding: 10px;
  background-color: #002760;
  position: absolute;
  bottom: 0;
  width: 100%;
`

const CommentWrapper = styled.div`
  font-size: 40px;
  font-weight: bold;
  padding: 15px;
  background: rgb(0,109,180);
  background: linear-gradient(90deg, rgba(0,109,180,1) 0%, rgba(0,135,194,1) 100%);
  margin: 5px;
  text-align: left;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: row;
`

const Username = styled.span`
  color: #B3FFFF;
  display: inline-block;
  vertical-align: middle;
`

const Comment = styled.span`
  color: #7FB8DA;
`

const Img = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 20px;
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`


const App = () => {

  const [ currentComments, setComments ] = useState([]);

  client.on('message', (channel, tags, message, self) => {
    if(self) return;
    currentComments.push({
      username: tags['display-name'],
      message
    });
    setComments([...currentComments]);
  });

  
  return (
    <Body className="App">
      { currentComments && currentComments.map((c, idx) => {
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
