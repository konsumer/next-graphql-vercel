/* global alert */
import React from 'react'
import { useQuery, useMutation } from 'urql'
import Link from 'next/link'

const GET_USERS = `
query GET_USERS {
  getUsers {
    id
    login
  }
} 
`

const REFRESH_MOCK = `
  mutation REFRESH_MOCK {
    refreshMock
  }
`

const PageIndex = () => {
  const [{ data, error, fetching }] = useQuery({ query: GET_USERS })
  const [refreshState, refreshMock] = useMutation(REFRESH_MOCK)

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

  const handleRefresh = async () => {
    const { error } = await refreshMock()
    if (error) {
      alert(error.message)
    } else {
      window.location.reload(true)
    }
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
      <button onClick={handleRefresh} disabled={refreshState?.fetching}>Refresh Mock</button>
    </>
  )
}

export default PageIndex
