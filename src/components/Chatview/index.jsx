import React, { useState, useEffect } from 'react';
import { parse } from 'simple-tmi-emotes'
import ReactHtmlParser from 'react-html-parser';
// import TopBar from './TopBar';
import iconMod from '../../images/mod_icon_small.png';
import { getUser } from '../../api';
import {
  Body,
  CommentWrapper,
  Username,
  Comment,
  Img,
  InfoWrapper,
  ModIcon,
  InnerBody
} from '../styled/Chat'

import Client from './client';

const Chatview = () => {

  // const [ filters, setFilters ] = useState({});
 
  const [ data, setData ] = useState({
    comments: [],
    users: {},
  });
  
  const handleOnMessage = (...response) => {
    const [ _channel, tags, message, self ] = response;
    if (self) return;
    const isCommand = message.startsWith('!');
    if (!isCommand) {
      updateComment(_channel, tags, message, self);
    }
  }

  const updateComment = async (_channel, tags, message, self) => {
    if (self) return;
    const userId = tags['user-id'];

    // ADD COMMENT TO COMMENTS
    const options = {
      format: 'default',
      themeMode: 'light',
      scale: '1.0'
    }
  
    const emotes = tags['emotes']
    const html = parse(message, emotes, options);
    let comment = {
      tags,
      userId,
      username: tags['display-name'],
      message: html
    }
    data.comments.push(comment);

    // ADD USER TO MAP
    // If the user already exists in the object then we push the new comment
    if (data.users[userId]) {
      data.users[userId].comments.push(message);
    } else {
      // If the user is new, we just add the new comment
      try {
        const user = await getUser(userId);
        data.users[userId] = {
          userId: tags['user-id'],
          comments: [message],
          user: user.data.data[0],
        }
      } catch (error) {
        console.log(error)
      }
    }
    setData({ ...data });
  }

  useEffect(() => {
    Client.on('message', handleOnMessage);
  }, []);

  const handleOption = (index) => {
    console.log(index);
    
  }
  console.log(data.comments)
  return (
    <Body className="App">
      {/* <TopBar onOptionSelected={handleOption}/> */}
      <InnerBody>
        { data.comments && data.comments.map((c, idx) => {
          return (
            <CommentWrapper key={idx}>
              <Img src={data.users[c.userId].user.profile_image_url} />
              {/* <Img src={icon} /> */}
              <InfoWrapper>
                <Username>{c.username}</Username>
                <Comment>{ ReactHtmlParser(c.message) }</Comment>
              </InfoWrapper>
              {c.tags.mod && (
                <ModIcon src={iconMod} />
              )}
            </CommentWrapper>
          )
        })}
      </InnerBody>
    </Body>
  )
}

export default Chatview;