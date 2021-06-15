import React from 'react'
import { useQuery } from 'urql'
import Link from 'next/link'

import Page from '../lib/Page'

const GET_USERS = `
query GET_USERS {
  getUsers {
    id
    login
  }
} 
`

const PageIndex = () => {
  const [{ data, error, fetching }] = useQuery({ query: GET_USERS })

  if (fetching) {
    return (
      <div>LOADING...</div>
    )
  }

  if (error) {
    return (
      <div style={{ background: 'pink', color: 'red' }}>Error: {error?.message}</div>
    )
  }

  return (
    <>
      {data?.getUsers && (
        <div>
          <ul>
            {data.getUsers.map(user => (
              <li key={user.id}><Link href={`/user/${user.login}`}>{user.login}</Link></li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

const WrappedPage = () => (
  <Page>
    <PageIndex />
  </Page>
)

export default WrappedPage
