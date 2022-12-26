export interface IAuth{
    isAuthenticated: boolean,
    user?: object,
    logout: ()=> void,
    login: ({username, password}: {username: string, password: string}) => void,
    register?: () => void
}