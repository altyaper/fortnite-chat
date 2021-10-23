import styled from 'styled-components';

export const Body = styled.div`
  padding: 10px;
  background-color: #002760;
  position: absolute;
  bottom: 0;
  width: 100%;
`

export const CommentWrapper = styled.div`
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

export const Username = styled.span`
  color: #B3FFFF;
  display: inline-block;
  vertical-align: middle;
`

export const Comment = styled.span`
  color: #7FB8DA;
`

export const Img = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 20px;
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`