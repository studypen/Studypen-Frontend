import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppState, useClassId, useIsClassOwner } from '@hooks/index'
import React, { FC, useEffect, useMemo, useState } from 'react'
import './ClassDetail.scss'
import { faArrowLeft, faBackward, faCopy, faShare } from '@fortawesome/free-solid-svg-icons'
import { copy, share } from '@utils/index'
import { getClassInviteId } from '../../data/rest/index'
import { useHistory } from 'react-router'
import { useForm } from 'react-hook-form'
import { ClassScheduleType, createClassSchedule, DayOfWeek, fetchClassSchedule, NumDayOfWeek } from '@data/rest/class'
const TimeTables: FC<{ schedule: ClassSchedule }> = ({ schedule }) => {

  return <div className="schedule">
    <div className="day">{NumDayOfWeek[schedule.day_of_week]}</div>
    <div className="start-time">{schedule.start_time}</div>
    <div className="end-time">{schedule.end_time}</div>
  </div>
}
const CreateClassSchedule: FC<{ cls: Classes }> = ({ cls }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [mainError, setMainError] = useState('')
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { register, handleSubmit, setError, reset } = useForm()
  const schedules = useAppState(s => s.classState.isLoaded ? s.classState.timeSchedule : {})
  useEffect(() => {
    if (schedules[cls.id] === undefined)
      fetchClassSchedule(cls.id)
  }, [])
  const timeTable: ClassSchedule[] = schedules[cls.id] ?? []

  const innerHandleSubmit = async (data: ClassScheduleType) => {
    setIsLoading(true)

    const res = await createClassSchedule(data)

    setMainError(typeof res === 'string' ? res : '')
    if (res === undefined) {
      reset()
    }
    setIsLoading(false)

  }
  return <div className="create-class">
    <div className="time-schedules">
      {timeTable.length === 0 ? <div className="empty">Create Class</div>
      : timeTable.map(t=> <TimeTables schedule={t}></TimeTables>)
      }
    </div>
    <form className="form flex" onSubmit={handleSubmit(innerHandleSubmit)}>

      <select {...register('day', {
        required: "select one option"
      })} id="cars">
        <option value="">Select a day</option>
        {Object.keys(DayOfWeek).map((key) => <option key={key} value={key}>{key}</option>)}
      </select>
      <label className="input-group">
        <p> Start Time</p>
        <input type="time" {...register('start_time', { required: true })} />
      </label>
      <label className="input-group">
        <p> End Time</p>
        <input type="time" {...register('end_time', { required: true })} />
      </label>
      <input type="hidden" value={cls.id} {...register('classes', { required: true })} />
      {/* {errors.func && <p style={{color:'red'}}> {errors.func.message}</p> } */}
      <div className="input-group"> <p className="error-msg"> {mainError}</p>  </div>
      <label className="input-group">
        <button disabled={isLoading} type="submit">
          Add
           {isLoading ? <div className="loader"> </div> : <></>}
        </button>
      </label>
    </form>
  </div>
}


export const ClassDetail: FC<{ id: string }> = ({ id }) => {
  const cls = useClassId(id)
  const isOwner: boolean = useIsClassOwner(cls)
  let [inviteLink, setInviteLink] = useState('')
  useEffect(() => {
    if (isOwner) {
      getClassInviteId(id).then(setInviteLink)
    } else setInviteLink('')
  }, [isOwner])

  const { goBack } = useHistory()

  if (cls === undefined) {
    return <h1>Class Not found</h1>
  }

  const InviteLink = <div className="invite-link">
    <div className="code">
      {inviteLink}
    </div>
    <button onClick={() => copy(inviteLink)} className="copy"> <FontAwesomeIcon icon={faCopy} /></button>
    <button onClick={() => share(inviteLink)} className="share"> <FontAwesomeIcon icon={faShare} /></button>
  </div>


  return <div className="class-detail">
    <h1>
      <button onClick={goBack}> <FontAwesomeIcon icon={faArrowLeft} /> </button>
      <div className="class__logo"></div>
      <div className="class__title">{cls.name} {isOwner ? '🖊️' : ''} </div>
    </h1>
    <h3>
      <div className="class__code">{cls.code} {isOwner ? '🖊️' : ''}</div>
      {isOwner ? InviteLink : ''}
    </h3>
    <CreateClassSchedule cls={cls} />
  </div>

}

// function createScheduleClass(data: ClassSchedule) {
//   throw new Error('Function not implemented.')
// }
