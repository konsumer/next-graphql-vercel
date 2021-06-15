/* You can mock NextJS router with this component, and override all params as props */

import React from 'react'
import { RouterContext } from 'next/dist/next-server/lib/router-context'

const routerMock = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: async () => true, // jest.fn().mockResolvedValue(true)
  replace: async () => true, // jest.fn().mockResolvedValue(true)
  reload: () => {}, // jest.fn()
  back: () => {}, // jest.fn()
  prefetch: async () => undefined, // jest.fn().mockResolvedValue(undefined)
  beforePopState: () => {}, // jest.fn()
  events: {
    on: () => {}, // jest.fn()
    off: () => {}, // jest.fn()
    emit: () => {} // jest.fn()
  },
  isFallback: false
}

const MockRouter = ({ children, ...props }) => (
  <RouterContext.Provider value={{ ...routerMock, ...props }}>{children}</RouterContext.Provider>
)

export default MockRouter
