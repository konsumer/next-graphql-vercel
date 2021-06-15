// Put all your global page-stuff in here

import React from 'react'

import DataProvider from '../lib/DataProvider'
import '../lib/style.css'

const Page = ({ Component, pageProps }) => (
  <DataProvider>
    <header>
      <a href='https://github.com/konsumer/next-graphql-vercel'>DEMO SITE</a>
    </header>
    <main>
      <Component {...pageProps} />
    </main>
  </DataProvider>
)

export default Page
