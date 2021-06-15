import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'urql'

import Page from '../../lib/Page'

const GET_USER = `
  query GET_USER ($userId: String!) {
    getUser(name: $userId) {
      id
      login
      avatar_url
    }
  }
`

const PageUser = () => {
  const router = useRouter()
  const { userId } = router.query
  const [{ data, error, fetching }] = useQuery({ query: GET_USER, variables: { userId } })
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
    <Page>
      <dl>
        <dt>ID</dt>
        <dd>{data?.getUser.id}</dd>

        <dt>Name</dt>
        <dd>{data?.getUser.login}</dd>

        <dt>Image</dt>
        <dd><img src={data?.getUser.avatar_url} alt='avatar' /></dd>
      </dl>
    </Page>
  )
}

const WrappedPage = () => (
  <Page>
    <PageUser />
  </Page>
)

export default WrappedPage
