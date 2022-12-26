import create from 'zustand'
import createAuthSlice from './slices/authSlice'
import { IAuth } from './types/IAuth';


const useStore = create<IAuth>()((...a) => ({
    ...createAuthSlice(...a)
}))

export default useStore;