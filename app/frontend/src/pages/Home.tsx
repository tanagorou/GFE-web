import { styled } from '@mui/material/styles';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '92vh',
})

const TitleText = styled('h1')({
  fontSize: '70px',
  fontWeight: 'bold',
  color: 'rgba(0, 0, 0, 0.8)',
})

const DescriptionText = styled('p')({
  fontSize: '15px',
  color: 'rgba(0, 0, 0, 0.8)',
})

export default function Home(){
  return (
    <Container>
      <TitleText>Welecome to GFE-web</TitleText>
      <DescriptionText>
        このサイトはエンジニアの勉強・作業をサポートするためのWebアプリです。
      </DescriptionText>
    </Container>
  )
}