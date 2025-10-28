import { styled } from '@mui/material/styles';

const RecordCard = styled('div')({
  flex: 1,
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  margin: '10px',
  position: 'relative',
  width: '100%',
  boxSizing: 'content-box'
})

const RecordCardHeader = styled('div')({
  position: 'absolute',
  top: '5px',
  left: '5px',
  fontSize: '13px'
})

const RecordCardMain = styled('div')({
  '& span': {
    fontSize: '5vh',
  },
  '& p': {
    marginTop: '30px',
  },
  fontSize: '20px',
  fontWeight: '700',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

type CardProps = {
  title: string
  time: {hour: string, minute: string}
}

type time = {
  hour: string
  minute: string
}

export const CardRecorder = ({title='今日', time={hour: '9', minute: '35'}}: CardProps) => {
  console.log('カードが表示されました')
  console.log(time)
  return (
    <RecordCard>
      <RecordCardHeader>
        {title}
      </RecordCardHeader>
      <RecordCardMain>
        {time.hour ? <span>{time.hour}</span> : <span>0</span>}
        {time.hour ? <p>時間</p> : <p>時間</p>}
        {time.minute && <span>{time.minute}</span>}
        {time.minute && <p>分</p>}
      </RecordCardMain>
    </RecordCard>
  )
}