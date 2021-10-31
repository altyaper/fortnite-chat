import React, { useState, useEffect } from 'react';
import { parse } from 'simple-tmi-emotes'
import ReactHtmlParser from 'react-html-parser';
import icon from '../../icon_fortnite.png';
import iconMod from '../../mod_icon_small.png';
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

  const [ data, setData ] = useState({
    comments: [],
    users: {},
    leaderId: '',
    commentCount: 0
  });
  
  const handleOnMessage = (_channel, tags, message, self) => {
    if (self) return;
    const isCommand = message.startsWith('!');
    if (!isCommand) {
      updateComment(_channel, tags, message, self);
    }
  }

  const updateComment = (_channel, tags, message, self) => {
    if (self) return;
    const { username } = tags;
    const options = {
      format: 'default',
      themeMode: 'light',
      scale: '1.0'
    }
    const emotes = tags['emotes']
    const html = parse(message, emotes, options);
    data.comments.push({
      tags,
      userId: tags['user-id'],
      username: tags['display-name'],
      message: html
    });
    // If the user already exists in the object then we push the new comment
    if (data.users[username]) {
      data.users[username].comments.push(message);
      const commentCount = data.users[username].comments.length;
      data.users[username].commentCount = commentCount;
      if(commentCount > data.commentCount) {
        data.commentCount = commentCount;
        data.leaderId = tags['user-id'];
      }
    } else {
      // If the user is new, we just add the new comment
      data.users[username] = {
        userId: tags['user-id'],
        comments: [message],
        commentCount: 1
      }
      data.leaderId = tags['user-id'];
      data.commentCount = 1;
    }
    setData({ ...data });
  }

  useEffect(() => {
    Client.on('message', handleOnMessage);
  }, []);

  return (
    <Body className="App">
      <InnerBody>
        { data.comments && data.comments.map((c, idx) => {
          return (
            <CommentWrapper key={idx}>
              <Img src={icon} />
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