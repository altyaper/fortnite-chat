import styled from 'styled-components';

export const Body = styled.div`
  padding: 10px;
  background-color: #002760;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`

export const InnerBody = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`

export const ModIcon = styled.img`
  width: 3%;
  margin-left: auto;
`

export const CommentWrapper = styled.div`
  font-size: 40px;
  font-weight: bold;
  padding: 20px;
  background: rgb(0,109,180);
  background: linear-gradient(90deg, rgba(0,109,180,1) 0%, rgba(0,135,194,1) 100%);
  margin: 10px;
  text-align: left;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Username = styled.span`
  color: #B3FFFF;
  display: inline-block;
  vertical-align: middle;
`

export const Comment = styled.span`
  color: ${props => props.isLeader ? "#FBFF46" : "#7FB8DA"};
  img {
    width: 50px;
  }
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