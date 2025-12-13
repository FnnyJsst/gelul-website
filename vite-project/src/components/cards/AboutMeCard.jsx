import styled from "styled-components";

const Card = styled.div`
  width: 38vh;
  height: 45vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  margin-top: 6vh;
  margin-left: 8vh;
  margin-bottom: 6vh;
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