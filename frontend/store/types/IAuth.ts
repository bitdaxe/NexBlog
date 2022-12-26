export interface IAuth{
    isAuthenticated: boolean,
    user?: object,
    logout: ()=> void,
    setIsAuth: (value: boolean)=> void,
    login: ({username, password}: {username: string, password: string}, router: any) => void,
    register: ({username, password, email}: {username: string, password: string, email: string}, router: any) => void
}