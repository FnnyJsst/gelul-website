import styled from "styled-components";
import PropTypes from 'prop-types';

const Card = styled.div`
  width: 45vh;
  height: 45vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  margin-top: 8vh;
  margin-left: 8vh;
  margin-bottom: 8vh;
  overflow: hidden;
  background-color: #f0f0f0;
`

function AboutMeCard () {
  return (
    <Card>
      <video 
        src={new URL('../../assets/videos/about-me-video.mp4', import.meta.url).href}
        autoPlay 
        loop 
        muted 
        width="100%" 
        height="100%"
        style={{ objectFit: 'cover' }}
      />
    </Card>
  )
}

export default AboutMeCard;