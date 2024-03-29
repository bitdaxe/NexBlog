export interface IUser{
    email:string,
    id: number,
    username: string
}

export interface IAuth{
    isAuthenticated: boolean,
    user: IUser | null,
    error: boolean,
    toggleError: ()=> void,
    logout: ()=> void,
    loadUser: ()=> void,
    setIsAuth: (value: boolean)=> void,
    login: ({username, password}: {username: string, password: string}, router: any) => void,
    register: ({username, password, email}: {username: string, password: string, email: string}, router: any) => void
}