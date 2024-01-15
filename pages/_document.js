import { Analytics } from '@vercel/analytics/react';
import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='bg-primary'>
        <Main />
        <NextScript />

        <Analytics />
      </body>
    </Html>
  )
}