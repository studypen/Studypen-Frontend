type MainState = {
    isLogin: boolean,
    isLoading: boolean
}

interface UserRegistrationDetail {
    first_name: string,
    last_name: string,
    password: string,
    username: string,
    email: string,
    password2: string,
    detail?: string
}
type TOKENS = {
    refresh: string,
    access: string,
    user: User
}
interface User {
    first_name: string,
    last_name: string,
    username: string,
    email: string
}

type Classes = {
    id: string,
    name: string,
    code: string,
    teacher: User, // TODO only Full name require
    students: number, // TODO ^^^^^^^^^^
}


type AuthState = {
    user?: User,
    token?: string
}

type ClassSchedule = {
    "day_of_week": number, // sun=1...sat=7
    "start_time": string, // "16:00", hh:mm
    "end_time": string, //"17:00", hh:mm
    "classes": string,// "8LUW1X3Q" id
  }
type ClassState = {
    isLoading: boolean,
    isLoaded: false,
    classes?: Classes[],
} | {
    timeSchedule: {[id:string]: ClassSchedule[]},
    isLoading: boolean,
    isLoaded: true,
    classes: Classes[]
}



type Action = {
    type: string,
    payload?: any
}
type AuthAction = Action
type ClassAction = Action
type MainAction = Action
type DispatchType = (args: AuthAction) => AuthState

interface Message {
    body: string,
    sender: {
        username: string
    },
    parent_msg?: string,
    sent_at: string
}
interface ClassMessage {
    msg: Message,
    classes: string
}
