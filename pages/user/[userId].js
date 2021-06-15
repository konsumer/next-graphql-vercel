/* global alert */
import React from 'react'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from 'urql'

const GET_USER = `
  query GET_USER ($userId: String!) {
    getUser(name: $userId) {
      id
      login
      avatar_url
    }
  }
`

const DELETE_USER = `
  mutation DELETE_USER ($userId: String!) {
    deleteUser(name: $userId) {
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
  const [deleteState, deleteUser] = useMutation(DELETE_USER)

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

  const handleDelete = async () => {
    const { error } = await deleteUser({ userId })
    if (error) {
      alert(error.message)
    } else {
      router.push('/')
    }
  }

  return (
    <dl>
      <dt>ID</dt>
      <dd>{data?.getUser.id}</dd>

      <dt>Name</dt>
      <dd>{data?.getUser.login}</dd>

      <dt>Image</dt>
      <dd><img src={data?.getUser.avatar_url} alt='avatar' /></dd>

      <dd>
        <button onClick={handleDelete} disabled={deleteState?.fetching}>Delete</button>
      </dd>
    </dl>
  )
}

export default PageUser
