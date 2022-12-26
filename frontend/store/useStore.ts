import create from 'zustand'
import createAuthSlice from './slices/authSlice'
import createBlogSlice from './slices/blogSlice';
import { IAuth } from './types/IAuth';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { IBlog } from './types/IBlog';


const useStore = create<IAuth & IBlog>()((...a) => ({
    ...createAuthSlice(...a),
    ...createBlogSlice(...a)
}))

export default useStore;

if (typeof window !== "undefined") {
    const connection = window.__REDUX_DEVTOOLS_EXTENSION__?.connect({
        name:"name Field"
    })
    
    connection?.init(useStore.getState() )
    useStore.subscribe((newState)=>{
        connection?.send("State", newState)
    })
  }

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store', useStore);
  
}