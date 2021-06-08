import { server } from '@data/rest'
import { AxiosError } from 'axios'

const DayOfWeek = Object.freeze({ 'SUNDAY': 1, 'MONDAY': 2, 'TUSEDAY': 3, 'WEDNESDAY': 4, 'THURSDAY': 5, 'FRIDAY': 6, 'SATURDAY': 7, })
type ClassSchedule = {
  "day_of_week": number, // sun=1...sat=7
  "start_time": string, // "16:00", hh:mm
  "end_time": string, //"17:00", hh:mm
  "classes": string,// "8LUW1X3Q" id
}

type ClassScheduleRes = {
    "id": number,
    "classes": string,
    "day_of_week": number,
    "start_time": string,
    "end_time": string
}

const createClass = async ({day, start_time, end_time, classes}: {
  "day": keyof typeof DayOfWeek
  "start_time": `${number}:${number}`,
  "end_time": `${number}:${number}`,
  "classes": string
}) => {
  try {
    const schedule : ClassSchedule = {
      day_of_week: DayOfWeek[day],
      start_time, end_time, classes
    }
    const url = '/classes/schedule/'
    const res = await server.post<ClassScheduleRes>(url, schedule)

    // TODO: send to store
    return res.data
  } catch (err) {
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