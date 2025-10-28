import { useMemo } from "react"
import { useStudyTime } from "../context/StudyContext";

const ONE_SECONDS = 1000;
const ONE_MINUTES = 60000;
const ONE_HOURS = 3600000;

type CircularProgressProps = {
  totalMs: number,
  remainingMs: number,
  size?: number,
  strokeWidth?: number
  showLabel?: boolean,
  label?: string
  trackOpacity?: number
}

export default function CircularProgress({
  totalMs,
  remainingMs,
  size = 90,
  strokeWidth = 5,
  showLabel = true,
  label,
  trackOpacity = 0.1
}: CircularProgressProps){
  const { restState } = useStudyTime()
  const progress = useMemo(() => {
    if(totalMs <= 0){
      return 0
    }
    return ( totalMs - remainingMs ) / totalMs
  },[ totalMs, remainingMs ])

  const viewBox = 100
  const radius = 50 - strokeWidth/2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - progress)

  const formatTime = (msSeconds: number) => {
    const msSafe = Math.max(msSeconds, 0)
    const hour = Math.floor(msSafe / ONE_HOURS);
    const minute = Math.floor((msSafe % ONE_HOURS) / ONE_MINUTES);
    const second = Math.floor((msSafe % ONE_MINUTES) / ONE_SECONDS);
    return [hour, minute, second]
      .map((val: any) => String(val).padStart(2, "0"))
      .join(":");
  };

  return(
    <div className='CircularProgress' style={{marginTop: '10%',display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
      <svg width={50 + '%'} height={50 + '%'} viewBox={`0 0 ${viewBox} ${viewBox}`}>
        <g transform={`rotate(-90 ${viewBox/2} ${viewBox/2})`}>
          {/* 背景トラック */}
          <circle
            cx={viewBox/2}
            cy={viewBox/2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeOpacity={trackOpacity}
            strokeWidth={strokeWidth}
          />

          <circle 
            cx={viewBox/2}
            cy={viewBox/2}
            r={radius}
            fill="none"
            stroke={restState ? 'rgba(34, 197, 94, 0.87)' : 'rgba(14, 164, 233, 0.87)'}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 1s linear'}}
          />
        </g>

      </svg>
      { showLabel && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            fontWeight: 700,
            fontSize: 'clamp(12px, 4.8vw, 65px)',
            fontVariantNumeric: "tabular-nums",
            userSelect: "none"
          }}
          >
        { label ?? formatTime(remainingMs) }
        </div>
      )}
    </div>
  )
}