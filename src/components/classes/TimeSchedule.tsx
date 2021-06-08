import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import './TimeSchedule.scss'
export const TimeLine: FC = () => {
  const [lines, setLines] = useState<string[]>([])
  const timeline = useRef<HTMLDivElement>()
  const [timelineWidth, setTimelineWidth] = useState(0)
  const classesElRef = useRef<HTMLDivElement>()
  const activeLine = useRef<HTMLDivElement>()
  useEffect(() => {
    // TODO: get classes

  }, [])

  useEffect(() => {
    const handler = () => setTimelineWidth(timeline.current?.offsetWidth ?? 0)
    window.addEventListener('resize', handler)
    handler()
    return () => window.removeEventListener('resize', handler)
  }, [timeline.current])

  useEffect(() => {
    const hourWidth = timelineWidth / 24
    const minuteWidth = hourWidth / 60
    const intervalFun = () => {

      const date = new Date()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const scrollPos = hour * hourWidth + minute * minuteWidth

      if (classesElRef.current) {
        classesElRef.current.scrollLeft = scrollPos - hourWidth / 2
      }
      if (activeLine.current) {
        activeLine.current.style.left = `${scrollPos}px`
      }
    }
    const interval = setInterval(intervalFun, 1000 * 60)
    intervalFun()

    const mouseWheelHandler = (event: WheelEvent) => {
      event.preventDefault()
      if (classesElRef.current) {
        classesElRef.current.scrollLeft += event.deltaY * 1.5
      }
    }
    classesElRef.current?.addEventListener('wheel', mouseWheelHandler)

    return () => {
      clearInterval(interval)
      classesElRef.current?.removeEventListener('wheel', mouseWheelHandler)
    }
  }, [classesElRef.current, activeLine.current, timelineWidth])


  useMemo(() => {
    const lines = []
    for (let i = 0; i < 24 * 2; i++) {
      const hour = Math.floor(i / 2) % 12
      lines.push(`${hour === 0 ? 12 : hour
        }:${i & 0x1 ? '30' : '00'} ${i / 2 < 12 ? 'am' : 'pm'}`)
    }
    setLines(lines)
  }, [setLines])

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="timeline-header"></div>
      <div className="classes"
        ref={classesElRef as React.MutableRefObject<HTMLDivElement>}>
        <div className="timeline"
          ref={timeline as React.MutableRefObject<HTMLDivElement>}>
          <div className="class-items"></div>
          <div className="lines">

            {
              lines.map((el, i) =>
                <div className="line"
                  key={el}
                  style={{ left: (i) * timelineWidth / (lines.length) }}>
                  {el}
                </div>)
            }
            <div ref={activeLine as React.MutableRefObject<HTMLDivElement>}
              className="line active"></div>
          </div>
        </div>
      </div>
    </div>
  )
}


const ClassItem:FC<{name:string, startTime: number}> = ({name}) => {
  return <div className="class-items">
    <div className="name">{name}</div>
  </div>
}

const TimeLineHorizontal: FC= () => {
  const startTime = 10
  const endTime = 17
  const times :string[] =  useMemo(()=> {
    const times: string[] = []
    for(let i = startTime; i <= endTime;i++){
      times.push(`${i}:00`)
    }
    return times
  }, [])

  const classes = [
    {
      name: 'Computer Architecture',
      startTime: 10
    },
    {
      name: 'Automata Theory',
      startTime: 11
    },
    {
      name: 'Design and Analysis of Algorithm',
      startTime: 12
    },
    {
      name: 'Economics for Engineers',
      startTime: 14
    },
  ]

  return <div className="timeline-hz">
    <div className="clock">
      {times.map(e=> <div className="time"> {e} </div> )}

    </div>
    <div className="hz-classes">
        {classes.map(e=> <ClassItem {...e}/>)}
    </div>
    <div className="current-time">
      <div className="ct__time">10:50</div>
      <div className="line"></div>
    </div>

  </div>
}

export const TimeSchedule: FC = () => {


  return <>

    <div className="time-line-header">
      <div className="options">
        <div className="option active">
          Day
        </div>
        <div className="option">
          Week
        </div>
      </div>
      <div className="sub-options">
        <div className="option">
          Sun
        </div>
        <div className="option active">
          Mon
        </div>
        <div className="option">
          Tue
        </div>
        <div className="option">
        Wed
        </div>
        <div className="option">
        Thur
        </div>
        <div className="option">
        Fri
        </div>
                <div className="option">
                Sat
        </div>
      </div>
    </div>
    <TimeLineHorizontal/>
    {/* <TimeLine/> */}
  </>
}