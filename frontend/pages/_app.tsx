/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import useStore from '../store/useStore'

export default function App({ Component, pageProps }: AppProps) {
  const setIsAuth = useStore(state => state.setIsAuth)

  useEffect(()=>{    
   if(localStorage.getItem('authenticated') == 'true') {
    setIsAuth(true)
   }else{
    setIsAuth(false)
   }
  }, [])
  return <Component {...pageProps} />
}
