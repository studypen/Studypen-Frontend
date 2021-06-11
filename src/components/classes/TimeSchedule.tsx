import { fetchClassSchedule } from '@data/rest/class'
import { useAppState } from '@hooks/index'
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


const ClassItem:FC<{key:string, name:string, top: number, height: number}> = ({key, name, top, height}) => {
  return <div key={key} className="class-items" style={{top, height}}>
    <div className="name">{name}</div>
  </div>
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
const TimeLineHorizontal: FC <{day: number}>= ({day} ) => {
  const startTime = 7
  const endTime = 17
  const hourHeight = 60
  const totalHeigh = (endTime - startTime) * hourHeight

  const classes: Classes[] = useAppState(s => s.classState.classes ?? [])
  const schedules = useAppState(s=> s.classState.isLoaded? s.classState.timeSchedule: {})
  const classIdName: Map<string, string> = new Map()
  const date =  new Date()

  const hour = date.getHours() - startTime
  const minute =date.getMinutes()

  useEffect(()=>{
    for(const c of classes){
      if(schedules[c.id] === undefined){
        fetchClassSchedule(c.id)
      }
    }
  }, [classes])
  const showClasses: {name: string, top: number, height: number}[] = useMemo(()=> {
    const res: {name: string, top: number, height: number}[] = []
    for(const c of classes){
      classIdName.set(c.id, c.name)
    }
    for(const s in schedules){
      const today = schedules[s].filter(t => t.day_of_week === day)
      if(today.length === 0) continue

      for (const t of today){
        const stimes = t.start_time.split(':')
        const etimes = t.start_time.split(':')
        const top = (((+stimes[0]) - startTime)  *  hourHeight )+((+stimes[1]) * hourHeight/60 )
        const height = ((+etimes[0]) - startTime)+((+etimes[1]) * hourHeight/60 ) - top

        res.push({name: classIdName.get(t.classes)?? '', top, height})
      }
    }
    return res
  }, [schedules, day])

  const times :string[] =  useMemo(()=> {
    const times: string[] = []
    for(let i = startTime; i <= endTime;i++){
      times.push(`${i}:00`)
    }
    return times
  }, [])



  return <div className="timeline-hz">
    <div className="clock" style={{height: totalHeigh}}>
      {times.map((e, i)=> <div style={{top: i * hourHeight}} className="time"> {e} </div> )}

    </div>
    <div className="hz-classes">
        {showClasses.map(e=> <ClassItem key={e.name} {...e}/>)}
    </div>
    <div style={{top: (hour * hourHeight )+( minute * (hourHeight/60))}} className="current-time">
      <div className="ct__time">{`${hour + startTime}:${minute}`}</div>
      <div className="line"></div>
    </div>

  </div>
}

export const TimeSchedule: FC = () => {
  const d = new Date(Date.now());
  const [cDay, setDay] = useState(d.getDay() + 1)

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
        {days.map((day,i) => <button  onClick={()=>{ setDay(i + 1); console.log('eee');
        }} className={`option ${i === (cDay - 1)? 'active' : ''}`}>{day}</button>)}
      </div>
    </div>
    <TimeLineHorizontal day={cDay}/>
    {/* <TimeLine/> */}
  </>
}