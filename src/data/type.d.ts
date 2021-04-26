

interface UserRegistrationDetail {
    first_name: string,
    last_name: string,
    password: string,
    username: string,
    email: string,
    password2: string,
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
    teacher: {
        username: string,
        email: string,
        first_name: string,
        last_name: string
    },
    students: string[],
}


type AuthState = {
    user?: User,
    token?: string
}
type ClassState = {
    classes?: Classes
}



type Action = {
    type: string,
    payload?: any
}
type AuthAction = Action
type ClassAction = Action
type DispatchType = (args: AuthAction) => AuthState
