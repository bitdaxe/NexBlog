import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <Head />
      <body className='bg-slate-800 md:px-44'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
