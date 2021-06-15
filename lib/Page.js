// put any global page setup in here

import React from 'react'

import DataProvider from './DataProvider'

const Page = ({ children }) => <DataProvider>{children}</DataProvider>

export default Page
