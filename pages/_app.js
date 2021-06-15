// Put all your global page-stuff in here

import React from 'react'
import Link from 'next/link'

import DataProvider from '../lib/DataProvider'
import '../lib/style.css'

const Page = ({ Component, pageProps }) => (
  <DataProvider>
    <header>
      <h1>
        <Link href='/'>
          DEMO SITE
        </Link>
      </h1>
      <nav>
        <a href="/api">API</a>
        <a href="https://github.com/konsumer/next-graphql-vercel">Github</a>
      </nav>
    </header>
    <main>
      <Component {...pageProps} />
    </main>
  </DataProvider>
)

export default Page
