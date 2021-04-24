import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import './Dashboard.scss'

export const CreateClass: FC = () => {
  return (
    <div className="class">

      <div className="class__logo"></div>
      <div className="class__description">
        <div className="class__title">CS401</div>
        <div className="class__teacher_name">Hillal Roy</div>
        <div className="class__extra">provide letter</div>
      </div>
      <div className="class__options">&gt;</div>
    </div>
  )
}
export const Dashboard: FC = () => {
  return <div className="dashboard">
    <div className="dashboard__contents"></div>
    <div className="dashboard__content">

      <CreateClass></CreateClass>
    </div>
    <div className="dashboard__options"></div>
  </div>
}

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