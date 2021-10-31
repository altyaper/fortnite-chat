import styled from 'styled-components';

export const SupporterWrapper = styled.div`
position: relative;
overflow: hidden;
width: 775px;
height: 50px;

.componentViewerFade {
  width: 100%;
}
`

export const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  background-color: #00002C;

  .rank-image {
    width: 30px;
    margin-left: 10px;
    margin-right: 20px;
  }

  .profile-picture {
    margin-left: auto;
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  h1 {
    color: #7F7F95;
    font-size: 30px;
  }
`