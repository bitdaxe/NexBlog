import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'
import useStore from '../store/useStore'

export default function Document() {
 

  return (
    <Html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <Head />
      <body className='bg-slate-800 md:px-64'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
