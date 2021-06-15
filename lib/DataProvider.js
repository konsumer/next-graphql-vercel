/* global fetch */

import React from 'react'
import gql from 'graphql-tag'
import { pipe, subscribe } from 'wonka'
import { Provider, Client, dedupExchange, fetchExchange, createRequest } from 'urql'

// graphql client
export const client = new Client({
  url: '/api',
  exchanges: [dedupExchange, fetchExchange]
})

// simple promise-query, for stuff outside of react render-flow
export const query = (query, variables) => {
  const r = createRequest(gql(query), variables)
  return new Promise((resolve, reject) => {
    pipe(
      client.executeQuery(r),
      subscribe(({ data, error }) => {
        if (error) {
          return reject(error)
        }
        resolve(data)
      })
    )
  })
}

// run graphql, server-side, on the URL
export const queryURL = (url, query, variables, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  return fetch(url, { method: 'POST', headers, body: JSON.stringify({ query, variables }), ...options }).then(r => r.json())
}

// wrap your app with this, so you can make graphql requests
export const DataProvider = ({ children }) => (
  <Provider value={client}>
    {children}
  </Provider>
)

export default DataProvider
