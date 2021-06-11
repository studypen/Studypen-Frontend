import { getClasses, server } from '@data/rest'
import { AxiosError } from 'axios'
import * as actions from '@data/actionTypes'
import {store} from '@data/store'
export const DayOfWeek = Object.freeze({ 'SUNDAY': 1, 'MONDAY': 2, 'TUSEDAY': 3, 'WEDNESDAY': 4, 'THURSDAY': 5, 'FRIDAY': 6, 'SATURDAY': 7, })
export const NumDayOfWeek:{[id:number]: string} = Object.freeze({ 1: 'SUNDAY', 2: 'MONDAY',3: 'TUSEDAY', 4: 'WEDNESDAY', 5: 'THURSDAY',6: 'FRIDAY',7: 'SATURDAY', })


type ClassScheduleRes = {
    "id": number,
    "classes": string,
    "day_of_week": number,
    "start_time": string,
    "end_time": string
}
export type ClassScheduleType = {
  "day": keyof typeof DayOfWeek
  "start_time": `${number}:${number}`,
  "end_time": `${number}:${number}`,
  "classes": string
}
export const join = async(id: string) => {
try{
  const url = `/classes/join/?v=${id}`
  await server.get(url)
  getClasses()
  return true

}catch(err) {
  return false
}
}

export const createClassSchedule = async ({day, start_time, end_time, classes}: ClassScheduleType) => {
  try {
    const schedule : ClassSchedule = {
      day_of_week: DayOfWeek[day],
      start_time, end_time, classes
    }
    const url = '/classes/schedule/'
    const res = await server.post<ClassScheduleRes>(url, schedule)
    store.dispatch({
      type: actions.SCHEDULE_CREATED,
      payload: res.data
    })
    // TODO: send to store
    // return res.data
  } catch (err) {
    return err.response ?? err.message
  }
}


export const fetchClassSchedule = async (id:string) => {
  try{
    const url = `classes/schedule/?class=${id}`
    const res = await server.get<ClassSchedule>(url)
    store.dispatch({
      type: actions.SCHEDULE_FETCH,
      payload: {[id] :res.data}
    })
  }catch(err){
    //TODO:
    return err.response ?? err.message
  }
}
// createClass({ day: "FRIDAY", start_time: '55:36' })
// {
//   "day_of_week": "1", sun=1...sat=7
//   "start_time": "16:00", hh:mm
//   "end_time": "17:00", hh:mm
//   "classes": "8LUW1X3Q" id
// }