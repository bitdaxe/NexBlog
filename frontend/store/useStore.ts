import create from 'zustand'
import createAuthSlice from './slices/authSlice'
import { IAuth } from './types/IAuth';
import { mountStoreDevtool } from 'simple-zustand-devtools';


const useStore = create<IAuth>()((...a) => ({
    ...createAuthSlice(...a)
}))

export default useStore;

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store', useStore);
}