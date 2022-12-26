export interface IAuth{
    isAuthenticated: boolean,
    user?: object,
    login: ({username, password}: {username: string, password: string}) => void,
    register?: () => void
}